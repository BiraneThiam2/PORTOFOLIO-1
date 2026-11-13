# Script de la voix off — vidéo promo (50 s)

Lis chaque phrase au moment indiqué. Ton : posé, souriant, comme si tu parlais à un ami.
Astuce : enregistre-toi en regardant la vidéo muette pour suivre le rythme.

| Début | Scène | Texte |
|---|---|---|
| 0:00 | Accroche | Ton CV mérite mieux qu'un simple PDF. |
| 0:04 | Le site apparaît | Imagine un site à ton image, qui capte l'attention dès la première seconde. |
| 0:09 | Défilement | Chaque section prend vie au fil du défilement. |
| 0:14 | Compétences | Tes compétences, présentées de façon claire et visuelle. |
| 0:19 | Thème clair / sombre | Mode clair ou sombre, en un seul clic. |
| 0:23 | Français / anglais | Ton site parle français, et anglais. |
| 0:27 | Projets | Tes projets sont mis en valeur, avec de vraies études de cas. |
| 0:32 | GitHub | Ton activité GitHub s'affiche en temps réel. |
| 0:37 | Mobile | Et tout est parfaitement adapté au téléphone. |
| 0:41 | Comment ça marche | On échange sur ton profil, je conçois ton site, et il est en ligne. |
| 0:45 | Appel à l'action | Tu veux le tien ? Écris-moi, et on construit ton portfolio ensemble. |

## Ajouter ta voix à la vidéo

**Option simple (téléphone) :** ouvre `portfolio-promo-50s.mp4` dans CapCut, ajoute ton enregistrement
(Audio → Enregistrer, ou importe un mémo vocal), cale-le, ajoute une musique douce à ~15 % du volume, exporte.

**Option Mac (sans application) :** enregistre-toi d'une traite avec Dictaphone, exporte en `.m4a`, puis :

```bash
cd promo/source
swiftc -O mux.swift -o mux
./mux ../portfolio-promo-50s.mp4 --file ~/Desktop/ma-voix.m4a ../portfolio-promo-50s-ma-voix.mp4
```
