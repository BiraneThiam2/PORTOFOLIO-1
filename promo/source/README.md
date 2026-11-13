# Vidéo promo — sources

Vidéo verticale 1080×1920, 32 s, générée à partir de captures du portfolio.

## Refaire la vidéo (par ex. pour le site d'un client)

1. Lancer le site à capturer : `npm run build && npx vite preview --port 4789`
2. Capturer les visuels : `node capture.mjs` (remplit `assets/`)
3. Modifier les textes dans `motion.html` (accroche, légendes, nom et email de fin)
4. Aperçu en direct : ouvrir `motion.html?play` dans Chrome
5. Rendre les images : `node render.mjs video` (crée `frames/`, ~2-3 min)
6. Encoder en MP4 : `swiftc -O encode.swift -o encode && ./encode frames ../ma-video.mp4`

Le débit est réglé dans `encode.swift` (`AVVideoAverageBitRateKey`) : 14 Mb/s pour la qualité max, 5 Mb/s pour WhatsApp.
Les scripts utilisent le Chromium installé par Playwright (`~/Library/Caches/ms-playwright`).

## Version 50 s et voix off

- `motion.html` = version 50 s (l'ancienne 32 s est dans `motion-32s.html`).
- `offsets.mjs` recapture la page entière et donne la position de chaque section (utile si le site change).
- Voix off de synthèse : `vo/script.txt` contient « début en secondes|phrase ». Pour la régénérer :
  ```bash
  cd vo && i=0; while IFS='|' read -r t txt; do i=$((i+1)); say -v Thomas -r 182 -o l$i.aiff "$txt"; done < script.txt; cd ..
  swiftc -O mux.swift -o mux && ./mux ../portfolio-promo-50s.mp4 vo/script.txt vo ../portfolio-promo-50s-voix-off.mp4
  ```
- Avec ta propre voix (un seul fichier) : `./mux ../portfolio-promo-50s.mp4 --file ma-voix.m4a ../sortie.mp4`
