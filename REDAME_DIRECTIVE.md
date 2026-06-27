# EventSync - Frontend Platform

EventSync est une plateforme moderne de gestion et d'interaction pour événements d'entreprise. Ce dépôt contient le code de l'application frontend développé avec **Next.js (App Router)**, **TypeScript**, **Tailwind CSS** et **Zod**.

---

## 🛠️ Noyau d'Architecture (Core Infrastructure)

L'application s'appuie sur trois fichiers fondamentaux assurant la sécurité et la communication avec l'API REST :

1. **`src/shared/config/api.config.ts`** : Fetcher universel unifié (Serveur/Client) gérant l'injection automatique des jetons d'authentification et l'analyse de conformité des réponses de l'API grâce à **Zod**.
2. **`src/providers/AuthProvider.tsx`** : Contexte d'état React distribuant les informations de session de l'administrateur aux composants clients.
3. **`src/middleware.ts`** : Guardien côté serveur bloquant l'accès aux segments de routes d'administration (`/admin/*`) pour les utilisateurs non authentifiés.

---

## 📐 Règles de Développement Générales

* **Architecture Orientée Domaine (Feature-Driven)** : Aucun code métier ne doit être isolé de manière générique. Tout élément propre aux événements, sessions, speakers ou questions doit vivre dans son dossier respectif à l'intérieur de `src/modules/`.
* **Server Components par défaut** : Toutes les pages de l'App Router doivent rester des Server Components. L'usage de la directive `"use client"` est restreint aux composants atomiques nécessitant une interactivité immédiate (Formulaires, Boutons dynamiques).
* **Validation Zod Obligatoire** : Chaque requête réseau et chaque soumission de formulaire doit posséder son schéma de validation Zod associé pour garantir l'étanchéité aux données corrompues.

---

## 🗺️ Feuille de Route - Phase 1 : Espace Public

La zone publique ne requiert aucune authentification. Les tâches sont réparties en parallèle pour éviter les conflits Git.

### 👤 Répartition de l'Équipe

#### VALISOA : Module Événements & Layouts Publics
* Création du Layout Public global (Navbar + Footer).
* Page d'accueil (`/`) et catalogue de recherche des événements (`/events`).
* Implémentation du service `event.service.ts` et des schémas de données associés.

#### ZINEDIS : Module Intervenants (Speakers)
* Création de la liste des experts (`/speakers`) et des fiches profils individuelles (`/speakers/[id]`).
* Implémentation de `speaker.service.ts` (méthodes `getAll` et `getById`).

#### DAVID : Module Sessions & Workspace
* Intégration de la liste chronologique des interventions sur la page de détail d'un événement (`/events/[id]`).
* Conception de la page de visionnage principale de l'événement (`/event-workspace/[eventId]/sessions/[sessionId]`).

#### HERINJAKA : Module Q&A (Questions & Upvotes)
* Création du formulaire anonyme de soumission de question (`QuestionForm.tsx`).
* Création de la liste dynamique des questions avec bouton d'upvote optimiste (`UpvoteButton.tsx`).
* Intégration de la logique de rafraîchissement (polling cyclique) pour mettre à jour les questions du public.

---

## 🚀 Lancement en Développement

1. Installer les dépendances du projet :
   ```bash
   npm install