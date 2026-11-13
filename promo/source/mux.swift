// Ajoute une voix off à une vidéo.
// Usage : mux <video.mp4> <script.txt> <dossier-audio> <sortie.mp4>
//   script.txt : une ligne par phrase « secondes|texte », fichiers audio l1.aiff, l2.aiff… dans l'ordre.
//   Ou : mux <video.mp4> --file <voix.m4a|.mp3|.wav> <sortie.mp4>  (un seul enregistrement calé au début)
import AVFoundation

func run() async throws {
  let a = CommandLine.arguments
  let video = AVURLAsset(url: URL(fileURLWithPath: a[1]))
  let duration = try await video.load(.duration)

  // 1) Piste audio : on place chaque phrase à son instant
  let audioComp = AVMutableComposition()
  let aTrack = audioComp.addMutableTrack(withMediaType: .audio, preferredTrackID: kCMPersistentTrackID_Invalid)!
  let out: String
  if a[2] == "--file" {
    let clip = AVURLAsset(url: URL(fileURLWithPath: a[3]))
    let src = try await clip.loadTracks(withMediaType: .audio).first!
    let d = min(try await clip.load(.duration), duration)
    try aTrack.insertTimeRange(CMTimeRange(start: .zero, duration: d), of: src, at: .zero)
    out = a[4]
  } else {
    let lines = try String(contentsOfFile: a[2], encoding: .utf8).split(separator: "\n").filter { !$0.isEmpty }
    for (i, line) in lines.enumerated() {
      let start = Double(line.split(separator: "|")[0])!
      let clip = AVURLAsset(url: URL(fileURLWithPath: "\(a[3])/l\(i + 1).aiff"))
      let src = try await clip.loadTracks(withMediaType: .audio).first!
      let d = try await clip.load(.duration)
      try aTrack.insertTimeRange(CMTimeRange(start: .zero, duration: d), of: src, at: CMTime(seconds: start, preferredTimescale: 600))
    }
    out = a[4]
  }
  let m4a = URL(fileURLWithPath: NSTemporaryDirectory() + "vo-\(UUID().uuidString).m4a")
  let e1 = AVAssetExportSession(asset: audioComp, presetName: AVAssetExportPresetAppleM4A)!
  e1.outputURL = m4a; e1.outputFileType = .m4a
  e1.timeRange = CMTimeRange(start: .zero, duration: duration)
  await e1.export()
  guard e1.status == .completed else { throw e1.error ?? NSError(domain: "audio", code: 1) }

  // 2) Vidéo (copiée telle quelle) + audio AAC
  let comp = AVMutableComposition()
  let vSrc = try await video.loadTracks(withMediaType: .video).first!
  let vT = comp.addMutableTrack(withMediaType: .video, preferredTrackID: kCMPersistentTrackID_Invalid)!
  try vT.insertTimeRange(CMTimeRange(start: .zero, duration: duration), of: vSrc, at: .zero)
  let voice = AVURLAsset(url: m4a)
  let aSrc = try await voice.loadTracks(withMediaType: .audio).first!
  let aT = comp.addMutableTrack(withMediaType: .audio, preferredTrackID: kCMPersistentTrackID_Invalid)!
  try aT.insertTimeRange(CMTimeRange(start: .zero, duration: min(try await voice.load(.duration), duration)), of: aSrc, at: .zero)
  let outURL = URL(fileURLWithPath: out)
  try? FileManager.default.removeItem(at: outURL)
  let e2 = AVAssetExportSession(asset: comp, presetName: AVAssetExportPresetPassthrough)!
  e2.outputURL = outURL; e2.outputFileType = .mp4
  await e2.export()
  guard e2.status == .completed else { throw e2.error ?? NSError(domain: "mux", code: 2) }
  try? FileManager.default.removeItem(at: m4a)
  print("OK → \(out)")
}

let sem = DispatchSemaphore(value: 0)
Task { do { try await run() } catch { print("ERREUR:", error) }; sem.signal() }
sem.wait()
