import { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Header from "../components/Header";
import { addRecette, changeRecette, removeRecette } from "../reducers/recettes";

export default function ShoppingListScreen({ navigation }) {
  const [isChecked, setCheck] = useState(false);
  const recette = useSelector((state) => state.recettes.value);
  const dispatch = useDispatch();

  // const AllIngredients = [];
  // let ingredients;
  // recette.recettes.map((data, i) => {

  //   ingredients = data.ingredients.map((ing, i) => {
  //     return (
  //       <View style={styles.div} key={i}>
  //         <BouncyCheckbox onPress={() => setCheck(!isChecked)} />
  //         <Text>
  //           {ing.quantite} {ing.nom}
  //         </Text>
  //       </View>
  //     );
  //   });
  //   AllIngredients.push(ingredients);

  // });

  let recettes = [
    {
      _id: {
        $oid: "646e132251052355fc665e53",
      },
      nom: "curry vert de poulet fermier",
      type: "poulet",
      description:
        "Ce curry à toutes les qualités d'un bon curry. Il est chaud, généreux, convivial et prêt en a peine plus d'une demi-heure. Comme quoi, plus besoin de faure une grande école pour avoir un beau curryculum vitae (vous l'avez ?)",
      temps: "35min",
      difficulte: "facile",
      instruction: [
        "Dans une casserole, faites revenir le riz d'une dizaine de secondes dans un fond d'huile de tournesol à feu vif. Ajoutez 600 mililitres d'au chaudes salée (environ 2 grosses louches) puis couvrez. A la reprise de l'ébullition, baissez le feu au minimum. Lorsqu'il n'y a plus d'eau, éteignez le feu et laissez reposer à couvert 10 minutes. Salez et poivrez",
        "Coupez les filets de poulet et les poivrons en lamelles d'environ un pouce de large (un vrai pouce, pas la mesure anglaise).",
        "Dans une seconde casserole, faites revenir à feu moyen 2 cuillerées à café de pâte de curry avec 1 cuillerée à soupe d'huile de tournesol. Au bout de 2 minutes, ajoutez le poulet et les poivrons et laissez cuire environ 5 minutes",
        "Versez le lait de coco dans la casserole puis laissez réduire 10 minutes",
        "Déposez une part de riz dans chaque assiette, puis le poulet aux poivrons",
        "Parsemez la coriandre après l'avvoir lavée, séchée puis ciselée grossièrement. Et maintenant à table !",
      ],
      image:
        "https://res.cloudinary.com/dhwt4rlu3/image/upload/v1683979836/FoodPlanner/nugget_poulet_eq0dgz.jpg",
      ingredients: [
        {
          nom: "filet de poulet",
          type: "protein",
          quantite: "4",
          image: "string",
        },
        {
          nom: "riz",
          type: "féculent",
          quantite: "400g",
          image: "string",
        },
        {
          nom: "poivrons",
          type: "légumes",
          quantite: "2",
          image: "string",
        },
        {
          nom: "lait de coco",
          type: "lactose",
          quantite: "1 brique",
          image: "string",
        },
        {
          nom: "coriandre",
          type: "épices",
          quantite: "1 botte",
          image: "string",
        },
        {
          nom: "huile de tournesol",
          type: "lipide",
          quantite: "2 cuillerées à soupe",
          image: "string",
        },
        {
          nom: "pâte de curry vert",
          type: "épices",
          quantite: "2 cuillerées à café",
          image: "string",
        },
      ],
    },
    {
      _id: {
        $oid: "646e132251052355fc665e54",
      },
      nom: "nuggets de poulet et pommes de terre au four",
      type: "poulet",
      description:
        "Pas la peine de vous chanter les louanges des nuggets de poulet : c'est léquivalent culinaire des photos de chats sur Internet. Et voici la recette hyper simple, sans friture et garantie sans cartilages, conservateurs ou additifs, puisque c'est vous qui choisissez les morceaux et qui faites tout maison. Alors, on essaie ?",
      temps: "30min + 1 heure de repos",
      difficulte: "moyen",
      instruction: [
        "Coupez le filets de poulet en gros dés, placez-les dans un saladier et badigeonnez-les de paprika et d'huile d'olive. Salez, poivrez et mélangez.Laissez mariner pendant 1 heure au réfrigérateur",
        "A la main, réduisez les corn-flakes en chapelure, mais pas trop fine",
        "Sortez le poulet du réfrigérateur et enrobez chaque dé de farine, puis plongez-les dans l'oeuf battu et enfin dans les corn-flakes. Disposez-les au fur à mesure dans un plat qui va au four. laissez reposer de nouveau 30 minutes au frais.",
        "Préchauffez le four à 180°C",
        "Pendant ce temps, lavez et séchez les pommes de terre. Coupez-les en quartiers et placez-les dans un plat allant au four. Ajoutez l'huile de colza puis mélangez un coup. Enfournez 20 minutes jusq'à ce que les pommes de terre soient légèrement dorées.",
        "Enfournez les nuggets pendant 12 minutes. Servez ces nuggets bien chauds...Et dégustez-les avec les doigts comme aux United Stats of 'Murcia !",
      ],
      image:
        "https://res.cloudinary.com/dhwt4rlu3/image/upload/v1683979836/FoodPlanner/curry_Poulet_clcmfh.jpg",
      ingredients: [
        {
          nom: "filet de poulet",
          type: "protein",
          quantite: "2",
          image: "string",
        },
        {
          nom: "pomme de terre",
          type: "féculent",
          quantite: "500g",
          image: "string",
        },
        {
          nom: "corn-flakes",
          type: "céréales",
          quantite: "1 grosse poigné",
          image: "string",
        },
        {
          nom: "oeuf",
          type: "protein",
          quantite: "2",
          image: "string",
        },
        {
          nom: "farine",
          type: "féculent",
          quantite: "",
          image: "string",
        },
        {
          nom: "huile d'olive",
          type: "lipide",
          quantite: "1 cuillerées à café",
          image: "string",
        },
        {
          nom: "huile de colza",
          type: "lipide",
          quantite: "2 cuillerées à soupe",
          image: "string",
        },
        {
          nom: "paprika",
          type: "epices",
          quantite: "1 cuillerées à café",
          image: "string",
        },
      ],
    },
    {
      _id: {
        $oid: "646e132251052355fc665e55",
      },
      nom: "bowl de patates douces, mâche et avocats",
      type: "vege",
      description:
        "Ce bowl léger est complètement veggie-friendly, parfait pour accueillir vos amis les plus branchés. Il ne manque plus que le cappuccino au lait d'avoine, le disque de Bon Iver et les compliments sur vos moustaches",
      temps: "20 minutes + 10 minute de cuisson",
      difficulte: "facile",
      instruction: [
        "Epluchez, puis taillez les patates douces en cubes que vous ferez sauter à la poêle avec de l'huile de tournesol, du sel, du poivre et du paprika pendant 10 minutes",
        "Coupez les avocats en tranches ou en gros cubes",
        "Lavez la mâche, séchez-la et disposez-la dans un joli bowl (pas un bol, un bowl). Posez ensuite les patates douces sautées et l'avocat. Ajoutez 1 filet d'huile d'olive et 1 pincée de fleur de sel, puis servez !",
      ],
      image:
        "https://res.cloudinary.com/dhwt4rlu3/image/upload/v1684063596/FoodPlanner/bowl_de_patate_douces_flxyyx.jpg",
      ingredients: [
        {
          nom: "patate douce",
          type: "féculent",
          quantite: "2",
          image: "string",
        },
        {
          nom: "mâche",
          type: "verdure",
          quantite: "200g",
          image: "string",
        },
        {
          nom: "huile de tournesol",
          type: "lipide",
          quantite: "-",
          image: "string",
        },
        {
          nom: "huile d'olive",
          type: "lipide",
          quantite: "4 cuillerées à café",
          image: "string",
        },
        {
          nom: "paprika",
          type: "épices",
          quantite: "3/4 pincées de paprika",
          image: "string",
        },
      ],
    },
    {
      _id: {
        $oid: "646e132251052355fc665e56",
      },
      nom: "spaghetti al pesto, burrata ed arugula",
      type: "feculent",
      description:
        "Certain ont besoin de leur passeport et d'une place en charter pour bisiter l'Italie. Vous, non. Avec cette recette de spaghettis, il vous suffit de 4 ingrédients pour vivre pleinement l'expérience italienne: onctueuse, raffinée et parfumée comme un après-midi à Rome",
      temps: "20 minutes + 10 minute de cuisson",
      difficulte: "facile",
      instruction: [
        "Dans une casserole, portez de l'eau salée à ébullition",
        "Plongez les spaghettis 8 minutes dans l'eau bouillante. En fin de cuisson, conservez 3 cuillerées à soupe de cuisson. Egouttez, débarassez et ajoutez un filet d'huile d'olive",
        "Dans la casserole hors du feu, versez le pesto, ajoutez-y l'eau de cuisson que vous aviez mise de côté et les spaghettis, puis mélangez.",
        "Dans chaque assiette, disposez les pâtes, une grosse poignée de roquette et une burrata. Ajoutez un tour de moulin à poivre et envoyer : chaud devant !",
      ],
      image:
        "https://res.cloudinary.com/dhwt4rlu3/image/upload/v1684062720/FoodPlanner/spaghetti_al_pesto_burrata_ed_arugula_ybpz3r.jpg",
      ingredients: [
        {
          nom: "spaghettis",
          type: "féculent",
          quantite: "500g",
          image: "string",
        },
        {
          nom: "burata",
          type: "lactose",
          quantite: "4",
          image: "string",
        },
        {
          nom: "pesto",
          type: "épices",
          quantite: "1 pot",
          image: "string",
        },
        {
          nom: "huile d'olive",
          type: "lipide",
          quantite: "4 cuillerées à café",
          image: "string",
        },
      ],
    },
    {
      _id: {
        $oid: "646e132251052355fc665e57",
      },
      nom: "tataki de saumon et mangue fraîche",
      type: "poisson",
      description:
        "L'une des recettes stars de notre carte, adoptée par toute l'équipe et nos clients. Et pour cause : du saumon mariné puis snacké 2 minutes sur un lit de riz vinaigré et de gros morceaux de mangue. A ce niveau-là de gourmandise, ce n'est presque plus un plat mais un dessert.",
      temps: "10 minutes + 24 heures de marinades",
      difficulte: "difficile",
      instruction: [
        "Lavez et séchez le basilic",
        "Réalisez la marinade en mélangeant la sauce soja sucrée, le miel d'acacia, l'huile de sésame, le jus des citrons et le basilic. Mixez l'ensemble, puis faites-y mariner le saumon pendant 24 heures.",
        "Rincez le riz japonais au moins 3 fois à l'eau claire. Egouttez et recouvrez-le avec environ 1, 2 fois son volume d'eau (336 millilitres pour les moins doués en calcul mental), puis couvrez la casserole et posez-la sur un feu vif. Aux premiers bouillons, baissez à feu moyen et comptez 10 minutes. Quand il n'y a plus d'eau, éteignez le feu et laissez reposer à couvert 10 minutes supplémentaires.",
        "Placez les pavés de saumon dans un plat et faites-les colorer au four 2 minutes à 210°C. Détaillez les tronçons en tranches fines façon tataki et parsemez-les de graines de sésame doré.",
        "Coupez la mangue en dés. Dressez le riz, le saumon, la mangue et accompagnez de sauce soja sucrée.",
      ],
      image:
        "https://res.cloudinary.com/dhwt4rlu3/image/upload/v1684063876/FoodPlanner/tataki_de_saumon_ypjdc7.jpg",
      ingredients: [
        {
          nom: "pavés de saumon",
          type: "protein",
          quantite: "4",
          image: "string",
        },
        {
          nom: "riz japonais",
          type: "féculent",
          quantite: "280g",
          image: "string",
        },
        {
          nom: "mangue",
          type: "fruit",
          quantite: "240g",
          image: "string",
        },
        {
          nom: "sauce soja",
          type: "sauce",
          quantite: "5 cuillerée à soupe",
          image: "string",
        },
        {
          nom: "graine de sésame doré",
          type: "graine",
          quantite: "-",
          image: "string",
        },
        {
          nom: "bassilic",
          type: "plante",
          quantite: "1 botte",
          image: "string",
        },
        {
          nom: "sauce soja",
          type: "sauce",
          quantite: "3 cuillerée à soupe",
          image: "string",
        },
        {
          nom: "miel d'acacia",
          type: "sauce",
          quantite: "2 cuillerée à soupe",
          image: "string",
        },
        {
          nom: "citron vert",
          type: "fruit",
          quantite: "2",
          image: "string",
        },
      ],
    },
  ];

  let ingredients;
  let tousIngredients = recettes.reduce(function (prev, curr) {
    return [...prev, ...curr.ingredients];
  }, []); // fonction pour rassembler tous les tableaux d'ingrdients en un seul tableau
  for (const item of tousIngredients) {
    const quantite = item.quantite;
    const nombre = quantite.match(/\d+(?:.\d+)?/); // regex pour récupérer les nombres
    if (nombre) {
      const reste = quantite.replace(nombre[0], "").trim();
      item.nombre = parseFloat(nombre[0]); //transforme une chaîne de caractères en un nombre flottant
      item.reste = reste; // récupère les lettres
    }
  }

  result = Object.values(
    tousIngredients.reduce((r, { nom, nombre, reste, test }) => {
      if (!r[nom]) r[nom] = { nom, nombre: 0, reste, test };
      r[nom].nombre += nombre; // fait la somme des ingrédients (nombre)
      if (test === "FAIL") r[nom].test = "FAIL";
      return r;
    }, {})
  );

  ingredients = result.map((ing, i) => {
    return (
      <View style={styles.div} key={i}>
        <BouncyCheckbox
          style={styles.checkbox}
          fillColor="#E4631B"
          unfillColor="#fff"
          iconImageStyle={{ width: 20, height: 20 }}
          iconStyle={{ borderColor: "#E4631B", borderRadius: 0 }}
          innerIconStyle={{ borderRadius: 0 }}
          onPress={() => setCheck(!isChecked)}
        />
        <Text style={styles.textCheckBox}>
          {ing.nombre} {ing.reste} {ing.nom}
        </Text>
      </View>
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Header />
        </TouchableOpacity>
        <Text style={styles.title}>Liste de courses</Text>
      </View>
      <View style={styles.fond}>
        <ScrollView>{ingredients}</ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingBottom: 100,
    paddingTop: 100,
  },

  fond: {
    backgroundColor: "rgba(	120, 203, 38, 0.4)",
    margin: "5%",
  },

  scrollView: {
    backgroundColor: "rgba(	120, 203, 38, 0.4)",
    marginHorizontal: 20,
    flexDirection: "column",
  },
  div: {
    flexDirection: "row",
    margin: 20,
    alignItems: "center",
  },
  titleDiv: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "red",
    height: 40,
    width: "100%",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginTop: "15%",
    paddingBottom: "3%",
    fontFamily: "FredokaBold",
  },

  textCheckBox: {
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Fredoka",
  },
});
