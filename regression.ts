interface Point {
  x: number;
  y: number;
}

interface IRegression {
  calculer(): { pente: number; ordonneeOrigine: number; rCarre: number };
  // Prédit une valeur y pour un x donné avec les paramètres calculés
  predire(x: number, resultat: { pente: number; ordonneeOrigine: number }): number;
}

// Implémentation spécifique : régression linéaire par méthode des moindres carrés
class RegressionLineaire implements IRegression {
  private points: Point[]; // Données d'entrée pour la régression

  constructor(points: Point[]) {
    this.points = points;
  }

  calculer() {
    const n = this.points.length; // Nombre de points
    
    // Calcul des moyennes arithmétiques de x et y
    const moyenneX = this.points.reduce((s, p) => s + p.x, 0) / n;
    const moyenneY = this.points.reduce((s, p) => s + p.y, 0) / n;

    // Variables pour les calculs de régression
    let sommeXY = 0;     // Σ(xi - x̄)(yi - ȳ) - covariance
    let sommeXCarre = 0; // Σ(xi - x̄)² - variance de x

    // Calcul des sommes nécessaires pour la formule de régression
    for (const point of this.points) {
      const diffX = point.x - moyenneX; // Écart à la moyenne de x
      const diffY = point.y - moyenneY; // Écart à la moyenne de y
      sommeXY += diffX * diffY;         // Accumulation covariance
      sommeXCarre += diffX * diffX;     // Accumulation variance x
    }

    // Formules de régression linéaire par moindres carrés
    const pente = sommeXY / sommeXCarre;                    // a = cov(x,y) / var(x)
    const ordonneeOrigine = moyenneY - pente * moyenneX;    // b = ȳ - a*x̄

    // Calcul du R² 
    let sommeResidusCarre = 0; // SSres - somme des carrés des résidus
    let varianceTotale = 0;    // SStot - variance totale de y
    
    for (const point of this.points) {
      const yPrevu = pente * point.x + ordonneeOrigine; // Valeur prédite par le modèle
      const residu = point.y - yPrevu;                  // Erreur de prédiction
      sommeResidusCarre += residu * residu;             // sommeResidusCarre += résidu²
      varianceTotale += Math.pow(point.y - moyenneY, 2); // varianceTotale += (y - ȳ)²
    }

    // R² = 1 - sommeResidusCarre/varianceTotale (mesure la proportion de variance expliquée)
    const rCarre = 1 - sommeResidusCarre / varianceTotale;
    
    return { pente, ordonneeOrigine, rCarre };
  }

  // y = ax + b 
  predire(x: number, resultat: { pente: number; ordonneeOrigine: number }) {
    return resultat.pente * x + resultat.ordonneeOrigine;
  }
}

// Générateur de données - respecte le principe de responsabilité unique (SRP)
// Séparé de la régression pour découpler la génération des données du calcul
class GenerateurDonnees {
  // Génère des données synthétiques suivant y = 2x + 5 + bruit
  static genererDonnees(nb: number): Point[] {
    const points: Point[] = [];
    for (let i = 1; i <= nb; i++) {
      // Bruit augmenté pour rendre les données moins parfaites et mieux tester la régression
     const bruit = (Math.random() - 0.5) * 12; 
      // Relation linéaire théorique : y = 2x + 5 + bruit
      points.push({ x: i, y: 2 * i + 5 + bruit });
    }
    return points;
  }
}

class ApplicationRegression {
  private regression: IRegression; // Dépendance vers l'interface, pas la classe

  // Injection de dépendance via le constructeur
  constructor(regression: IRegression) {
    this.regression = regression;
  }

  // Orchestration de l'exécution et affichage des résultats
  executer() {
    // Exécution du calcul de régression
    const resultat = this.regression.calculer();
    
    // Affichage des paramètres de la droite de régression
    console.log("=== RÉGRESSION LINÉAIRE ===");
    console.log(`Pente: ${resultat.pente.toFixed(4)}`);                    // Coefficient directeur
    console.log(`Ordonnée à l'origine: ${resultat.ordonneeOrigine.toFixed(4)}`); // Intersection axe y
    console.log(`R²: ${resultat.rCarre.toFixed(4)}`);                     // Qualité ajustement

    // Démonstration de prédictions pour différentes valeurs
    console.log("\n=== PRÉDICTIONS ===");
    [0, 10, 25].forEach(x => {
      const prediction = this.regression.predire(x, resultat);
      console.log(`x = ${x} -> y = ${prediction.toFixed(2)}`);
    });
  }
}

// =============== PROGRAMME PRINCIPAL ===============

// 1. Génération des données d'entraînement (20 points avec relation y = 2x + 5 + bruit)
const donnees: Point[] = GenerateurDonnees.genererDonnees(20);

// 2. Création de l'instance de régression linéaire
const regression: IRegression = new RegressionLineaire(donnees);

// 3. Création de l'application avec injection de dépendance
const app = new ApplicationRegression(regression);

// 4. Exécution du programme
app.executer();

