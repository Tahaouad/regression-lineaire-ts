# Système de Régression Linéaire en TypeScript

Un système de régression linéaire implémenté en TypeScript 

## 📋 Description

Ce projet implémente un algorithme de régression linéaire par la méthode des moindres carrés avec :
- Architecture modulaire respectant les principes SOLID
- Interface générique permettant l'extension à d'autres types de régressions
- Génération de données synthétiques pour les tests
- Calcul automatique du coefficient de détermination (R²)


## 🚀 Installation et Exécution

### Prérequis
- Node.js (version 14 ou supérieure)
- npm ou yarn

### Installation de TypeScript
```bash
# Installation globale de TypeScript
npm install -g typescript

# Ou installation locale dans le projet
npm install typescript --save-dev
```
### Méthode 1 : Compilation puis exécution
```bash
# 1. Compiler le fichier TypeScript
tsc regression.ts

# 2. Exécuter le fichier JavaScript généré
node regression.js
```

### Méthode 2 : Exécution directe avec ts-node
```bash
# Installation de ts-node (si pas déjà fait)
npm install -g ts-node

# Exécution directe
ts-node regression.ts
```

### Méthode 3 : Configuration avec package.json
```bash
# Initialiser un projet npm
npm init -y

# Installer TypeScript localement
npm install typescript @types/node --save-dev

# Ajouter un script dans package.json :
# "scripts": {
#   "build": "tsc regression.ts",
#   "start": "node regression.js",
#   "dev": "ts-node regression.ts"
# }

# Puis exécuter
npm run build && npm start
# ou
npm run dev
```

## 📊 Sortie Attendue

```=== RÉGRESSION LINÉAIRE ===
Pente: 2.0127
Ordonnée à l'origine: 4.2905
R²: 0.9189

=== PRÉDICTIONS ===
x = 0 -> y = 4.29
x = 10 -> y = 24.42
x = 25 -> y = 54.61
```

## 🔧 Structure du Code

- **Point** : Interface définissant un point cartésien
- **IRegression** : Interface générique pour les algorithmes de régression
- **RegressionLineaire** : Implémentation de la régression linéaire
- **GenerateurDonnees** : Classe pour générer des données de test
- **ApplicationRegression** : Orchestrateur principal

## 📚 Note Importante

**Toutes les règles de calcul mathématique** (formules de régression linéaire, calcul du R², méthode des moindres carrés) **proviennent de recherches sur le web** et de sources académiques standard. Ce projet est à des fins éducatives et d'apprentissage de l'architecture logicielle.

