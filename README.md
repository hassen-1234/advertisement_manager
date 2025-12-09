# Gestionnaire de Publicités (Advertisement Manager)

Une application de bureau multiplateforme construite avec **Tauri**, **React** et **Tailwind CSS**. 
Ce logiciel permet de créer facilement des affiches publicitaires professionnelles pour les services de livraison et d'e-commerce.

## 🚀 Fonctionnalités Clés

- **Création de Services Personnalisée** : Ajoutez des services avec des titres, des couleurs et des icônes personnalisées (images locales).
- **Aperçu en Temps Réel** : Visualisez instantanément le rendu de l'affiche publicitaire.
- **Mise en Page Adaptative** : L'agencement de la grille s'adapte automatiquement selon le nombre de services (3, 4, ou 5 colonnes) pour un rendu toujours esthétique.
- **Pied de Page Localisé** : Intégration automatique des logos de paiement (Bankily, Sedad, Click, BCIpay) et des contacts (Whatsapp, Snapchat).
- **Exportation HD** : Exportez votre création en un clic au format **PNG** haute résolution.
- **Interface Moderne** : UI soignée avec effets 3D, dégradés et animations fluides.

## 🛠️ Technologies Utilisées

- **Frontend** : React 19, Vite
- **Styling** : Tailwind CSS
- **Backend / Core** : Tauri v2 (Rust)
- **Utilitaires** : `html-to-image` (export), `react-hot-toast` (notifications)

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

1.  **Node.js** (version 18 ou supérieure)
2.  **Rust** (via `rustup`)
3.  **Outils de Build C++** (pour Windows : Visual Studio Build Tools avec "Développement Desktop C++")

## 🔧 Installation

Clonez le projet et installez les dépendances :

```bash
# Aller dans le dossier du projet
cd advertisement_manager

# Installer les dépendances JavaScript
npm install
```

## ▶️ Démarrage (Développement)

Pour lancer l'application en mode développement :

```bash
npm run tauri dev
```

## 📦 Construction (Production)

Pour créer l'exécutable final optimisé (fichier `.exe`) :

```bash
npm run tauri build
```
