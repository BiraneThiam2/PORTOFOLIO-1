// Encode les images frames/*.jpg en MP4 H.264 (AVFoundation).
import AVFoundation
import AppKit

let args = CommandLine.arguments
let dir = args[1], out = args[2]
let fps: Int32 = 30, W = 1080, H = 1920
let files = try FileManager.default.contentsOfDirectory(atPath: dir).filter { $0.hasSuffix(".jpg") }.sorted()
let url = URL(fileURLWithPath: out)
try? FileManager.default.removeItem(at: url)
let writer = try AVAssetWriter(outputURL: url, fileType: .mp4)
let settings: [String: Any] = [
  AVVideoCodecKey: AVVideoCodecType.h264,
  AVVideoWidthKey: W, AVVideoHeightKey: H,
  AVVideoCompressionPropertiesKey: [AVVideoAverageBitRateKey: 14_000_000, AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel],
]
let input = AVAssetWriterInput(mediaType: .video, outputSettings: settings)
input.expectsMediaDataInRealTime = false
let adaptor = AVAssetWriterInputPixelBufferAdaptor(assetWriterInput: input, sourcePixelBufferAttributes: [
  kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32ARGB, kCVPixelBufferWidthKey as String: W, kCVPixelBufferHeightKey as String: H,
])
writer.add(input)
writer.startWriting()
writer.startSession(atSourceTime: .zero)
for (i, f) in files.enumerated() {
  autoreleasepool {
    guard let img = NSImage(contentsOfFile: dir + "/" + f), let cg = img.cgImage(forProposedRect: nil, context: nil, hints: nil) else { return }
    while !input.isReadyForMoreMediaData { usleep(2000) }
    var pb: CVPixelBuffer?
    CVPixelBufferPoolCreatePixelBuffer(nil, adaptor.pixelBufferPool!, &pb)
    guard let buf = pb else { return }
    CVPixelBufferLockBaseAddress(buf, [])
    let ctx = CGContext(data: CVPixelBufferGetBaseAddress(buf), width: W, height: H, bitsPerComponent: 8,
                        bytesPerRow: CVPixelBufferGetBytesPerRow(buf), space: CGColorSpaceCreateDeviceRGB(),
                        bitmapInfo: CGImageAlphaInfo.noneSkipFirst.rawValue)!
    ctx.draw(cg, in: CGRect(x: 0, y: 0, width: W, height: H))
    CVPixelBufferUnlockBaseAddress(buf, [])
    adaptor.append(buf, withPresentationTime: CMTime(value: CMTimeValue(i), timescale: fps))
  }
}
input.markAsFinished()
let sem = DispatchSemaphore(value: 0)
writer.finishWriting { sem.signal() }
sem.wait()
print(writer.status == .completed ? "OK \(files.count) images → \(out)" : "ERREUR \(String(describing: writer.error))")
