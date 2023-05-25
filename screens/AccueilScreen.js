import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Modal,
  Button,
  Dimensions,
} from "react-native";
//import des hooks d'effets
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import React from "react";
//import du module map
import MapView, { Marker } from "react-native-maps";
//import du module de geoloc
import * as Location from "expo-location";
import symbolicateStackTrace from "react-native/Libraries/Core/Devtools/symbolicateStackTrace";

export default function AccueilScreen({ navigation }) {
  const [currentPosition, setCurrentPosition] = useState({
    latitude: 43.29,
    longitude: 5.37,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  }); //variable d'état de location de l'utilisateur
  const [apiData, setApiData] = useState([]); //variable d'état qui recupère les données de l'api
  const [modalErrorSemainier, setModalErrorSemainier] = useState(false);
  const semaineRedux = useSelector((state) => state.semaines.value);
  //Attente d'autorisation de la géoloc
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
          setCurrentPosition(location.coords);
          fetchData();
        });
      }
    })();
  }, []);

  //fonction qui fetch l'API en fonction de ta localisation
  const fetchData = async () => {
    fetch(`https://opendata.agencebio.org/api/gouv/operateurs/?activite=Distribution&lat=${currentPosition.latitude}&lng=${currentPosition.longitude}
  `)
      .then((response) => response.json())
      .then((data) => {
        setApiData(data.items);
      });
  };

  const maSemaine = () => {
    if (semaineRedux.allCheckBoxSelected !== undefined) {
      navigation.navigate("Semainier");
    } else {
      setModalErrorSemainier(true);
    }
  };
  //ajout des marqueurs graces aux données en dur récupéré via l'api du gouvernement sur le bio
  const markers = apiData.map((data, i) => {
    return (
      <Marker
        key={i}
        coordinate={{
          latitude: data.adressesOperateurs[0].lat,
          longitude: data.adressesOperateurs[0].long,
        }}
        title={data.denominationcourante}
      />
    );
  });

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.semaineEnCours}>
        <TouchableOpacity
          style={styles.buttonAccessSemainier}
          onPress={() => maSemaine()}
        >
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalErrorSemainier}
            onRequestClose={() => {
              setIsModalVisible(!modalErrorSemainier);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text>Aucune semaine est actuellement en cours</Text>
                <Text>Allons en créer une !</Text>
                <View style={{ marginTop: 50 }}>
                  <TouchableOpacity
                    style={styles.buttonCLose}
                    onPress={() => setModalErrorSemainier(false)}
                  >
                    <Text>Fermer</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <Text style={styles.textButton}>Ma semaine en cours</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.creationSemaine}>
        <TouchableOpacity
          style={styles.buttonCreationSemaine}
          onPress={() => navigation.navigate("Ma Semaine")}
        >
          <Text style={styles.textButton}>Créer ma semaine</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mapBackground}>
        <MapView region={currentPosition} style={styles.map}>
          {currentPosition && (
            <Marker coordinate={currentPosition} pinColor="blue"></Marker>
          )}
          {markers}
        </MapView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Fredoka",
    marginTop: 5,
    marginBottom: 5,
  },
  semaineEnCours: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#78CB26",
    width: 360,
    height: 100,
    marginBottom: 5,
    borderRadius: 4,
  },
  creationSemaine: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#78CB26",
    width: 360,
    height: 100,
    marginBottom: 5,
    borderRadius: 4,
  },
  mapBackground: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    width: Dimensions.get("window").width - 10,
    height: 350,
    borderRadius: 4,
  },
  map: {
    display: "flex",
    width: 350,
    height: 340,
    borderRadius: 4,
  },
  buttonCreationSemaine: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 9,
  },
  buttonAccessSemainier: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 9,
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 215,
    alignItems: "center",
  },
  modalView: {
    fontFamily: "Fredoka",
    backgroundColor: "#ffff",
    borderRadius: 4,
    paddingTop: 30,
    paddingBottom: 30,
    paddingHorizontal: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  buttonCLose: {
    fontFamily: "Fredoka",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#78CB26",
    borderRadius: 4,
    width: 200,
    height: 50,
  },
  textButton: {
    fontFamily: "Fredoka",
    fontSize: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

//données recupérées de l'API du gouvernement
// const apiData = [
//   {
//     id: 127316,
//     raisonSociale: "89DIS",
//     denominationcourante: "CARREFOUR MARKET MIRAMAS - 89DIS",
//     siret: "90379919500016",
//     numeroBio: 48400,
//     telephone: null,
//     email: null,
//     codeNAF: "47.11D",
//     gerant: "Petitjean",
//     dateMaj: "2023-01-14",
//     telephoneCommerciale: null,
//     reseau: "Carrefour",
//     categories: [
//       {
//         id: 6,
//         nom: "Grandes surfaces généralistes",
//       },
//     ],
//     siteWebs: [],
//     adressesOperateurs: [
//       {
//         id: 29571,
//         lieu: "BOULEVARD JACQUES MINET",
//         codePostal: "13140",
//         ville: "MIRAMAS",
//         lat: 43.576313,
//         long: 4.998062,
//         codeCommune: "13063",
//         active: true,
//         departementId: 14,
//         typeAdresseOperateurs: ["Lieux d'activité"],
//       },
//       {
//         id: 704812,
//         lieu: "Market Blv Minet",
//         codePostal: "13140",
//         ville: "Miramas",
//         lat: 43.5759877,
//         long: 4.9984239,
//         codeCommune: "13063",
//         active: true,
//         departementId: 14,
//         typeAdresseOperateurs: [
//           "Siège social",
//           "Lieux de vente",
//           "Lieux d'activité",
//         ],
//       },
//     ],
//     productions: [
//       {
//         id: 765,
//         code: "10.71.1",
//         nom: "Pain ; pâtisseries et viennoiseries fraîches",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//       {
//         id: 1319,
//         code: "47.00.12",
//         nom: "Commerce de détail de fruits et légumes de conservation",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//     ],
//     activites: [
//       {
//         id: 2,
//         nom: "Préparation",
//       },
//       {
//         id: 3,
//         nom: "Distribution",
//       },
//     ],
//     certificats: [
//       {
//         organisme: "Bureau Veritas Certification France",
//         etatCertification: "ENGAGEE",
//         dateSuspension: null,
//         dateArret: null,
//         dateEngagement: "2004-08-13",
//         dateNotification: "2022-12-13T15:53:22.676Z",
//         url: "https://certifie.bureauveritas.fr/organisme/48400",
//       },
//     ],
//     mixite: "Oui",
//   },
//   {
//     id: 26430,
//     raisonSociale: "A2S DISTRI",
//     denominationcourante: "CARREFOUR MARKET SALON DE PROVENCE - A2S DISTRI",
//     siret: "88958973500014",
//     numeroBio: 124497,
//     telephone: null,
//     email: null,
//     codeNAF: "47.11D",
//     gerant: null,
//     dateMaj: "2023-01-22",
//     telephoneCommerciale: null,
//     reseau: "Carrefour",
//     categories: [
//       {
//         id: 6,
//         nom: "Grandes surfaces généralistes",
//       },
//     ],
//     siteWebs: [],
//     adressesOperateurs: [
//       {
//         id: 321528,
//         lieu: "BD VICTOR JOLY",
//         codePostal: "13300",
//         ville: "SALON-DE-PROVENCE",
//         lat: 43.639258,
//         long: 5.095551,
//         codeCommune: "13103",
//         active: true,
//         departementId: 14,
//         typeAdresseOperateurs: ["Siège social"],
//       },
//       {
//         id: 473389,
//         lieu: "BOULEVARD VICTOR JOLY",
//         codePostal: "13300",
//         ville: "SALON DE PROVENCE",
//         lat: 43.638424,
//         long: 5.09537,
//         codeCommune: "13103",
//         active: true,
//         departementId: 14,
//         typeAdresseOperateurs: ["Lieux d'activité"],
//       },
//     ],
//     productions: [
//       {
//         id: 765,
//         code: "10.71.1",
//         nom: "Pain ; pâtisseries et viennoiseries fraîches",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//       {
//         id: 1319,
//         code: "47.00.12",
//         nom: "Commerce de détail de fruits et légumes de conservation",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//     ],
//     activites: [
//       {
//         id: 2,
//         nom: "Préparation",
//       },
//       {
//         id: 3,
//         nom: "Distribution",
//       },
//     ],
//     certificats: [
//       {
//         organisme: "Bureau Veritas Certification France",
//         etatCertification: "ENGAGEE",
//         dateSuspension: null,
//         dateArret: null,
//         dateEngagement: "2016-01-15",
//         dateNotification: "2016-01-21T23:00:00.000Z",
//         url: "https://certifie.bureauveritas.fr/organisme/124497",
//       },
//     ],
//     mixite: "Non",
//   },
//   {
//     id: 119786,
//     raisonSociale: "A2S DISTRI",
//     denominationcourante: "A2S DISTRI",
//     siret: "88958973500014",
//     numeroBio: 40870,
//     telephone: null,
//     email: null,
//     codeNAF: "47.11D",
//     gerant: "simoneau",
//     dateMaj: "2022-04-11",
//     telephoneCommerciale: null,
//     reseau: "Carrefour",
//     categories: [
//       {
//         id: 6,
//         nom: "Grandes surfaces généralistes",
//       },
//     ],
//     siteWebs: [],
//     adressesOperateurs: [
//       {
//         id: 321528,
//         lieu: "BD VICTOR JOLY",
//         codePostal: "13300",
//         ville: "SALON-DE-PROVENCE",
//         lat: 43.639258,
//         long: 5.095551,
//         codeCommune: "13103",
//         active: true,
//         departementId: 14,
//         typeAdresseOperateurs: ["Siège social"],
//       },
//     ],
//     productions: [
//       {
//         id: 766,
//         code: "10.71.11",
//         nom: "Pain frais",
//         etatProductions: [],
//       },
//       {
//         id: 1313,
//         code: "GP.Commerce.de.détail",
//         nom: "Commerce de détail",
//         etatProductions: [],
//       },
//     ],
//     activites: [
//       {
//         id: 3,
//         nom: "Distribution",
//       },
//     ],
//     certificats: [
//       {
//         organisme: "Bureau Veritas Certification France",
//         etatCertification: "ARRETEE",
//         dateSuspension: null,
//         dateArret: "2021-12-31",
//         dateEngagement: "2020-11-01",
//         dateNotification: "2022-04-11T14:19:32.349Z",
//         url: "https://certifie.bureauveritas.fr/organisme/40870",
//       },
//     ],
//     mixite: "Oui",
//   },
//   {
//     id: 90334,
//     raisonSociale: "ABC CHANVRE",
//     denominationcourante: "ABC CHANVRE",
//     siret: "88224074000010",
//     numeroBio: 11993,
//     telephone: null,
//     email: "contact@abcchanvre.com",
//     codeNAF: "46.76Z",
//     gerant: "LIEVREMONT Serge",
//     dateMaj: "2023-01-15",
//     telephoneCommerciale: "0768198786",
//     reseau: "",
//     categories: [
//       {
//         id: 7,
//         nom: "Grossistes",
//       },
//     ],
//     siteWebs: [
//       {
//         id: 4072,
//         url: "https://www.instagram.com/abc_chanvre/",
//         active: true,
//         operateurId: 90334,
//         typeSiteWebId: 5,
//         typeSiteWeb: {
//           id: 5,
//           nom: "Instagram",
//           status: 2,
//         },
//       },
//       {
//         id: 4073,
//         url: "https://www.facebook.com/abcCHANVRE",
//         active: true,
//         operateurId: 90334,
//         typeSiteWebId: 2,
//         typeSiteWeb: {
//           id: 2,
//           nom: "Facebook",
//           status: 2,
//         },
//       },
//     ],
//     adressesOperateurs: [
//       {
//         id: 155593,
//         lieu: "207 RTE DE POURRIERES",
//         codePostal: "13530",
//         ville: "TRETS",
//         lat: 43.451032,
//         long: 5.690718,
//         codeCommune: "13110",
//         active: true,
//         departementId: 14,
//         typeAdresseOperateurs: ["Lieux d'activité", "Siège social"],
//       },
//     ],
//     productions: [
//       {
//         id: 1319,
//         code: "47.00.12",
//         nom: "Commerce de détail de fruits et légumes de conservation",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//     ],
//     activites: [
//       {
//         id: 3,
//         nom: "Distribution",
//       },
//     ],
//     certificats: [
//       {
//         organisme: "Bureau Veritas Certification France",
//         etatCertification: "ENGAGEE",
//         dateSuspension: null,
//         dateArret: null,
//         dateEngagement: "2021-06-29",
//         dateNotification: "2020-05-12T12:38:38.381Z",
//         url: "https://certifie.bureauveritas.fr/organisme/11993",
//       },
//     ],
//     mixite: "Non",
//   },
//   {
//     id: 69265,
//     raisonSociale: "ACCES BIO",
//     denominationcourante: "ACCES BIO - BIOCOOP GRAND LITTORAL",
//     siret: "84374051500021",
//     numeroBio: 4030,
//     telephone: null,
//     email: null,
//     codeNAF: "47.29Z",
//     gerant: "Roustom ALLALI ",
//     dateMaj: "2023-05-03",
//     telephoneCommerciale: null,
//     reseau: "Biocoop",
//     categories: [
//       {
//         id: 4,
//         nom: "Magasins spécialisés",
//       },
//     ],
//     siteWebs: [],
//     adressesOperateurs: [
//       {
//         id: 471029,
//         lieu: "11 AV DE ST ANTOINE",
//         codePostal: "13015",
//         ville: "MARSEILLE 15",
//         lat: 43.375682,
//         long: 5.356096,
//         codeCommune: "13055",
//         active: true,
//         departementId: 14,
//         typeAdresseOperateurs: ["Siège social"],
//       },
//       {
//         id: 204731,
//         lieu: "CC GRAND LITTORAL",
//         codePostal: "13015",
//         ville: "Marseille",
//         lat: 43.3633232,
//         long: 5.35372049,
//         codeCommune: "13055",
//         active: true,
//         departementId: 14,
//         typeAdresseOperateurs: ["Lieux d'activité"],
//       },
//     ],
//     productions: [
//       {
//         id: 766,
//         code: "10.71.11",
//         nom: "Pain frais",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//       {
//         id: 1318,
//         code: "47.00.11",
//         nom: "Commerce de détail de fruits et légumes frais",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//           {
//             id: 5,
//             etatProduction: "CNS",
//           },
//         ],
//       },
//       {
//         id: 1319,
//         code: "47.00.12",
//         nom: "Commerce de détail de fruits et légumes de conservation",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//       {
//         id: 1320,
//         code: "47.00.13",
//         nom: "Commerce de détail de viandes",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//       {
//         id: 1323,
//         code: "47.00.16",
//         nom: "Commerce de détail de produits de boulangerie-pâtisserie",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//       {
//         id: 1324,
//         code: "47.00.17",
//         nom: "Commerce de détail de confiseries",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//       {
//         id: 1325,
//         code: "47.00.18",
//         nom: "Commerce de détail de produits laitiers",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//       {
//         id: 1326,
//         code: "47.00.19",
//         nom: "Commerce de détail d'œufs",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//       {
//         id: 1328,
//         code: "47.00.21",
//         nom: "Commerce de détail de café, thé, cacao et épices",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//       {
//         id: 1329,
//         code: "47.00.22",
//         nom: "Commerce de détail d'huiles et matières grasses comestibles",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//       {
//         id: 1331,
//         code: "47.00.24",
//         nom: "Commerce de détail d'autres produits alimentaires n.c.a.",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//       {
//         id: 1385,
//         code: "47.00.87",
//         nom: "Commerce de détail de produits agricoles bruts n.c.a.",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//     ],
//     activites: [
//       {
//         id: 2,
//         nom: "Préparation",
//       },
//       {
//         id: 3,
//         nom: "Distribution",
//       },
//     ],
//     certificats: [
//       {
//         organisme: "Ecocert France",
//         etatCertification: "ENGAGEE",
//         dateSuspension: null,
//         dateArret: null,
//         dateEngagement: "2019-11-18",
//         dateNotification: "2019-11-08T07:53:31.670Z",
//         url: "http://certificat.ecocert.com/index.php?ln=fr&source=agencebio&id=216755",
//       },
//     ],
//     mixite: "Non",
//   },
//   {
//     id: 81607,
//     raisonSociale: "ADS FOOD",
//     denominationcourante: "ADS FOOD",
//     siret: "75119031500018",
//     numeroBio: 171267,
//     telephone: null,
//     email: null,
//     codeNAF: "46.39B",
//     gerant: null,
//     dateMaj: "2023-03-20",
//     telephoneCommerciale: null,
//     reseau: "",
//     categories: [
//       {
//         id: 7,
//         nom: "Grossistes",
//       },
//     ],
//     siteWebs: [],
//     adressesOperateurs: [
//       {
//         id: 146255,
//         lieu: "La Duranne - 50 rue de la Grande Tousque BP 90015",
//         codePostal: "13791",
//         ville: "AIX EN PROVENCE CEDEX 03",
//         lat: 43.493107,
//         long: 5.35282,
//         codeCommune: "13001",
//         active: true,
//         departementId: 14,
//         typeAdresseOperateurs: ["Lieux d'activité", "Siège social"],
//       },
//     ],
//     productions: [
//       {
//         id: 1328,
//         code: "47.00.21",
//         nom: "Commerce de détail de café, thé, cacao et épices",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//       {
//         id: 1331,
//         code: "47.00.24",
//         nom: "Commerce de détail d'autres produits alimentaires n.c.a.",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//     ],
//     activites: [
//       {
//         id: 3,
//         nom: "Distribution",
//       },
//     ],
//     certificats: [
//       {
//         organisme: "Bureau Alpes contrôles",
//         etatCertification: "ARRETEE",
//         dateSuspension: null,
//         dateArret: "2023-03-20",
//         dateEngagement: "2019-01-02",
//         dateNotification: "2019-01-02T12:44:47.000Z",
//         url: "https://certification-bio.fr/pdf/?numero_client=A03M1905",
//       },
//     ],
//     mixite: "Oui",
//   },
//   {
//     id: 121820,
//     raisonSociale: "AGC DISTRIBUTION",
//     denominationcourante: "CARREFOUR CITY MARSEILLE - SARL AGC DISTRIBUTION",
//     siret: "84144067000021",
//     numeroBio: 42904,
//     telephone: null,
//     email: null,
//     codeNAF: "47.11D",
//     gerant: "Antoine CHARBONNIER",
//     dateMaj: "2023-01-15",
//     telephoneCommerciale: null,
//     reseau: "Carrefour",
//     categories: [
//       {
//         id: 6,
//         nom: "Grandes surfaces généralistes",
//       },
//     ],
//     siteWebs: [],
//     adressesOperateurs: [
//       {
//         id: 749273,
//         lieu: "2 PL DE ROME",
//         codePostal: "13006",
//         ville: "MARSEILLE 6",
//         lat: 43.291448,
//         long: 5.380476,
//         codeCommune: "13206",
//         active: true,
//         departementId: 14,
//         typeAdresseOperateurs: ["Lieux d'activité", "Siège social"],
//       },
//     ],
//     productions: [
//       {
//         id: 765,
//         code: "10.71.1",
//         nom: "Pain ; pâtisseries et viennoiseries fraîches",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//       {
//         id: 1318,
//         code: "47.00.11",
//         nom: "Commerce de détail de fruits et légumes frais",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//       {
//         id: 1319,
//         code: "47.00.12",
//         nom: "Commerce de détail de fruits et légumes de conservation",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//     ],
//     activites: [
//       {
//         id: 2,
//         nom: "Préparation",
//       },
//       {
//         id: 3,
//         nom: "Distribution",
//       },
//     ],
//     certificats: [
//       {
//         organisme: "Bureau Veritas Certification France",
//         etatCertification: "ARRETEE",
//         dateSuspension: null,
//         dateArret: "2022-12-08",
//         dateEngagement: "2013-01-10",
//         dateNotification: "2022-05-31T12:46:00.368Z",
//         url: "https://certifie.bureauveritas.fr/organisme/42904",
//       },
//     ],
//     mixite: "Non",
//   },
//   {
//     id: 120248,
//     raisonSociale: "AGRI FALLEN",
//     denominationcourante: "AGRI FALLEN",
//     siret: "41147713600013",
//     numeroBio: 41332,
//     telephone: null,
//     email: null,
//     codeNAF: "47.52A",
//     gerant: "TROUBAT MARC",
//     dateMaj: "2023-05-03",
//     telephoneCommerciale: null,
//     reseau: "",
//     categories: [
//       {
//         id: 7,
//         nom: "Grossistes",
//       },
//     ],
//     siteWebs: [],
//     adressesOperateurs: [
//       {
//         id: 465341,
//         lieu: "Quartier de l'avelanède",
//         codePostal: "13785",
//         ville: "Aubagne Cedex",
//         lat: 43.299578,
//         long: 5.591794,
//         codeCommune: "13005",
//         active: true,
//         departementId: 14,
//         typeAdresseOperateurs: ["Lieux d'activité"],
//       },
//       {
//         id: 408879,
//         lieu: "Quartier de l'avelanède",
//         codePostal: "13785",
//         ville: "Aubagne",
//         lat: 43.299578,
//         long: 5.591794,
//         codeCommune: "13005",
//         active: true,
//         departementId: 14,
//         typeAdresseOperateurs: ["Lieux d'activité"],
//       },
//       {
//         id: 967699,
//         lieu: "Quartier de l'avelanède",
//         codePostal: "13785",
//         ville: "Aubagne Cedex",
//         lat: 43.299587,
//         long: 5.591797,
//         codeCommune: null,
//         active: true,
//         departementId: 14,
//         typeAdresseOperateurs: ["Lieux d'activité"],
//       },
//       {
//         id: 372845,
//         lieu: "quartier de L AVELANEDE",
//         codePostal: "13400",
//         ville: "AUBAGNE",
//         lat: 43.301407,
//         long: 5.594372,
//         codeCommune: "13005",
//         active: true,
//         departementId: 14,
//         typeAdresseOperateurs: ["Siège social"],
//       },
//     ],
//     productions: [
//       {
//         id: 1171,
//         code: "46.38.29",
//         nom: "Commerce de gros d'autres produits alimentaires n.c.a.",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//       {
//         id: 1331,
//         code: "47.00.24",
//         nom: "Commerce de détail d'autres produits alimentaires n.c.a.",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//     ],
//     activites: [
//       {
//         id: 3,
//         nom: "Distribution",
//       },
//     ],
//     certificats: [
//       {
//         organisme: "Ecocert France",
//         etatCertification: "ENGAGEE",
//         dateSuspension: null,
//         dateArret: null,
//         dateEngagement: "2022-04-21",
//         dateNotification: "2022-04-22T13:21:46.746Z",
//         url: "http://certificat.ecocert.com/index.php?ln=fr&source=agencebio&id=262911",
//       },
//     ],
//     mixite: "Oui",
//   },
//   {
//     id: 57063,
//     raisonSociale: "AGROSEMENS",
//     denominationcourante: null,
//     siret: "44303238899999",
//     numeroBio: 155147,
//     telephone: null,
//     email: null,
//     codeNAF: null,
//     gerant: null,
//     dateMaj: "2023-05-03",
//     telephoneCommerciale: null,
//     reseau: "",
//     categories: [],
//     siteWebs: [],
//     adressesOperateurs: [
//       {
//         id: 971099,
//         lieu: "ZA DU VERDALAI",
//         codePostal: "13790",
//         ville: "ROUSSET",
//         lat: 43.4645293,
//         long: 5.61722119,
//         codeCommune: "13087",
//         active: true,
//         departementId: 14,
//         typeAdresseOperateurs: ["Lieux d'activité", "Siège social"],
//       },
//     ],
//     productions: [
//       {
//         id: 116,
//         code: "01.13.6",
//         nom: "Plants et semences potagers, à l'exclusion des semences de betteraves",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//       {
//         id: 123,
//         code: "01.13.72",
//         nom: "Semences de betteraves à sucre",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//       {
//         id: 169,
//         code: "01.19.22",
//         nom: "Semences florales",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//       {
//         id: 858,
//         code: "10.89.99",
//         nom: "Opérations sous-traitées intervenant dans l'élaboration d'autres produits alimentaires n.c.a.",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//       {
//         id: 1171,
//         code: "46.38.29",
//         nom: "Commerce de gros d'autres produits alimentaires n.c.a.",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//     ],
//     activites: [
//       {
//         id: 2,
//         nom: "Préparation",
//       },
//       {
//         id: 3,
//         nom: "Distribution",
//       },
//     ],
//     certificats: [
//       {
//         organisme: "Ecocert France",
//         etatCertification: "ENGAGEE",
//         dateSuspension: null,
//         dateArret: null,
//         dateEngagement: "2003-01-16",
//         dateNotification: "2004-06-17T22:00:00.000Z",
//         url: "http://certificat.ecocert.com/index.php?ln=fr&source=agencebio&id=39603",
//       },
//     ],
//     mixite: "Oui",
//   },
//   {
//     id: 18420,
//     raisonSociale: "AGRO SOURCING",
//     denominationcourante: "AGRO SOURCING SERVICE",
//     siret: "45407252100056",
//     numeroBio: 116476,
//     telephone: null,
//     email: null,
//     codeNAF: "46.38B",
//     gerant: null,
//     dateMaj: "2023-05-03",
//     telephoneCommerciale: null,
//     reseau: "",
//     categories: [],
//     siteWebs: [],
//     adressesOperateurs: [
//       {
//         id: 973431,
//         lieu: "1480 AV D'ARMENIE",
//         codePostal: "13120",
//         ville: "GARDANNE",
//         lat: 43.455277,
//         long: 5.457509,
//         codeCommune: "13041",
//         active: true,
//         departementId: 14,
//         typeAdresseOperateurs: ["Lieux d'activité", "Siège social"],
//       },
//       {
//         id: 211126,
//         lieu: "BATIMENT C - ETAGE 2",
//         codePostal: "13590",
//         ville: "Meyreuil",
//         lat: 43.475123,
//         long: 5.494314,
//         codeCommune: "13060",
//         active: true,
//         departementId: 14,
//         typeAdresseOperateurs: ["Lieux d'activité"],
//       },
//     ],
//     productions: [
//       {
//         id: 638,
//         code: "10.32.19",
//         nom: "Autres jus de fruits et légumes",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//       {
//         id: 646,
//         code: "10.39.14",
//         nom: "Fruits et légumes coupés et emballés",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//       {
//         id: 654,
//         code: "10.39.23",
//         nom: "Fruits à coque grillés, salés ou autrement préparés",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//       {
//         id: 656,
//         code: "10.39.25",
//         nom: "Arachides et fruits à coque, sans coques",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//       {
//         id: 657,
//         code: "10.39.29",
//         nom: "Autres conserves et préparations à base de fruits et de fruits à coque",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//       {
//         id: 804,
//         code: "10.82.24",
//         nom: "Fruits confits",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//       {
//         id: 821,
//         code: "10.84.12",
//         nom: "Sauces ; mélanges de condiments et assaisonnements préparés ; farines de moutarde et moutardes préparées",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//       {
//         id: 856,
//         code: "10.89.19",
//         nom: "Produits alimentaires divers n.c.a.",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//       {
//         id: 858,
//         code: "10.89.99",
//         nom: "Opérations sous-traitées intervenant dans l'élaboration d'autres produits alimentaires n.c.a.",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//       {
//         id: 916,
//         code: "11.07.19",
//         nom: "Autres boissons non alcoolisées",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//       {
//         id: 1121,
//         code: "46.21.11",
//         nom: "Commerce de gros de céréales",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//       {
//         id: 1141,
//         code: "46.31.12",
//         nom: "Commerce de gros de fruits et légumes de conservation",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//       {
//         id: 1150,
//         code: "46.33.13",
//         nom: "Commerce de gros d'huiles et de matières grasses comestibles",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//       {
//         id: 1153,
//         code: "46.34.11",
//         nom: "Commerce de gros de jus, eaux minérales, boissons rafraîchissantes et autres boissons non alcoolisées",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//       {
//         id: 1162,
//         code: "46.36.13",
//         nom: "Commerce de gros de chocolat et confiserie",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//       {
//         id: 1171,
//         code: "46.38.29",
//         nom: "Commerce de gros d'autres produits alimentaires n.c.a.",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//       {
//         id: 1400,
//         code: "52.10.19",
//         nom: "Autres services d'entreposage et de stockage",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//     ],
//     activites: [
//       {
//         id: 2,
//         nom: "Préparation",
//       },
//       {
//         id: 3,
//         nom: "Distribution",
//       },
//       {
//         id: 6,
//         nom: "Stockage",
//       },
//     ],
//     certificats: [
//       {
//         organisme: "Ecocert France",
//         etatCertification: "ENGAGEE",
//         dateSuspension: null,
//         dateArret: null,
//         dateEngagement: "2005-01-07",
//         dateNotification: "2005-06-13T22:00:00.000Z",
//         url: "http://certificat.ecocert.com/index.php?ln=fr&source=agencebio&id=60129",
//       },
//     ],
//     mixite: "Non",
//   },
//   {
//     id: 69745,
//     raisonSociale: "AJ SHOP",
//     denominationcourante: "CARREFOUR CITY MARSEILLE CHARTREUX - SARL AJ SHOP",
//     siret: "85101905900019",
//     numeroBio: 4510,
//     telephone: null,
//     email: null,
//     codeNAF: "47.11D",
//     gerant: "aguzzi jerome ",
//     dateMaj: "2022-07-26",
//     telephoneCommerciale: null,
//     reseau: "Carrefour",
//     categories: [
//       {
//         id: 6,
//         nom: "Grandes surfaces généralistes",
//       },
//     ],
//     siteWebs: [],
//     adressesOperateurs: [
//       {
//         id: 243092,
//         lieu: "44 AVENUE DES CHARTREUX",
//         codePostal: "13004",
//         ville: "MARSEILLE 4EME ARRONDISSE",
//         lat: 43.304122,
//         long: 5.398379,
//         codeCommune: "13055",
//         active: true,
//         departementId: 14,
//         typeAdresseOperateurs: ["Lieux d'activité"],
//       },
//       {
//         id: 133815,
//         lieu: "44 AV DES CHARTREUX",
//         codePostal: "13004",
//         ville: "MARSEILLE 4",
//         lat: 43.304043,
//         long: 5.398354,
//         codeCommune: "13055",
//         active: true,
//         departementId: 14,
//         typeAdresseOperateurs: ["Lieux d'activité", "Siège social"],
//       },
//     ],
//     productions: [
//       {
//         id: 1319,
//         code: "47.00.12",
//         nom: "Commerce de détail de fruits et légumes de conservation",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//       {
//         id: 1323,
//         code: "47.00.16",
//         nom: "Commerce de détail de produits de boulangerie-pâtisserie",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//     ],
//     activites: [
//       {
//         id: 3,
//         nom: "Distribution",
//       },
//     ],
//     certificats: [
//       {
//         organisme: "Bureau Veritas Certification France",
//         etatCertification: "ARRETEE",
//         dateSuspension: null,
//         dateArret: "2022-09-13",
//         dateEngagement: "2018-05-03",
//         dateNotification: "2019-10-28T08:59:53.562Z",
//         url: "https://certifie.bureauveritas.fr/organisme/4510",
//       },
//     ],
//     mixite: "Non",
//   },
//   {
//     id: 115173,
//     raisonSociale: "ALECO DISTRIB",
//     denominationcourante: "ALECO DISTRIB",
//     siret: "90093069400022",
//     numeroBio: 36286,
//     telephone: "0633434677",
//     email: null,
//     codeNAF: "47.11C",
//     gerant: "CORDIER",
//     dateMaj: "2022-12-06",
//     telephoneCommerciale: null,
//     reseau: "Carrefour",
//     categories: [
//       {
//         id: 6,
//         nom: "Grandes surfaces généralistes",
//       },
//     ],
//     siteWebs: [],
//     adressesOperateurs: [
//       {
//         id: 291858,
//         lieu: "205 BD DE LA LIBERATION",
//         codePostal: "13004",
//         ville: "MARSEILLE 4",
//         lat: 43.302286,
//         long: 5.394814,
//         codeCommune: "13204",
//         active: true,
//         departementId: 14,
//         typeAdresseOperateurs: ["Siège social"],
//       },
//     ],
//     productions: [
//       {
//         id: 765,
//         code: "10.71.1",
//         nom: "Pain ; pâtisseries et viennoiseries fraîches",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//       {
//         id: 1319,
//         code: "47.00.12",
//         nom: "Commerce de détail de fruits et légumes de conservation",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//     ],
//     activites: [
//       {
//         id: 2,
//         nom: "Préparation",
//       },
//       {
//         id: 3,
//         nom: "Distribution",
//       },
//     ],
//     certificats: [
//       {
//         organisme: "Bureau Veritas Certification France",
//         etatCertification: "ARRETEE",
//         dateSuspension: null,
//         dateArret: "2023-01-31",
//         dateEngagement: "2022-12-06",
//         dateNotification: "2022-01-17T08:00:06.732Z",
//         url: "https://certifie.bureauveritas.fr/organisme/36286",
//       },
//     ],
//     mixite: "Non",
//   },
//   {
//     id: 31388,
//     raisonSociale: "ALIMENTATION ANIMALE HP DISTRIBUTION",
//     denominationcourante: "ALIMENTATION ANIMALE HP DISTRIBUTION",
//     siret: "78868730900013",
//     numeroBio: 129436,
//     telephone: null,
//     email: null,
//     codeNAF: "47.76Z",
//     gerant: null,
//     dateMaj: "2023-01-15",
//     telephoneCommerciale: null,
//     reseau: "",
//     categories: [
//       {
//         id: 1,
//         nom: "Vente aux consommateurs",
//       },
//     ],
//     siteWebs: [],
//     adressesOperateurs: [
//       {
//         id: 31431,
//         lieu: "QUARTIER ST CYR CD 113",
//         codePostal: "13680",
//         ville: "LANCON DE PROVENCE",
//         lat: 43.587638,
//         long: 5.123398,
//         codeCommune: "13051",
//         active: true,
//         departementId: 14,
//         typeAdresseOperateurs: [
//           "Lieux d'activité",
//           "Lieux de vente",
//           "Siège social",
//         ],
//       },
//     ],
//     productions: [
//       {
//         id: 154,
//         code: "01.19.10.12",
//         nom: "Prairie permanente",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//       {
//         id: 1073,
//         code: "46",
//         nom: "COMMERCE DE GROS",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//     ],
//     activites: [
//       {
//         id: 1,
//         nom: "Production",
//       },
//       {
//         id: 3,
//         nom: "Distribution",
//       },
//     ],
//     certificats: [
//       {
//         organisme: "Bureau Veritas Certification France",
//         etatCertification: "ARRETEE",
//         dateSuspension: null,
//         dateArret: "2021-11-06",
//         dateEngagement: "2017-06-14",
//         dateNotification: "2017-06-13T22:00:00.000Z",
//         url: "https://certifie.bureauveritas.fr/organisme/129436",
//       },
//     ],
//     mixite: "Non",
//   },
//   {
//     id: 72363,
//     raisonSociale: "ALL4GREEN",
//     denominationcourante: "ALL 4 GREEN",
//     siret: "84864014000010",
//     numeroBio: 7128,
//     telephone: null,
//     email: null,
//     codeNAF: "46.75Z",
//     gerant: "Christophe Clamen",
//     dateMaj: "2023-05-03",
//     telephoneCommerciale: null,
//     reseau: "",
//     categories: [
//       {
//         id: 4,
//         nom: "Magasins spécialisés",
//       },
//       {
//         id: 7,
//         nom: "Grossistes",
//       },
//     ],
//     siteWebs: [],
//     adressesOperateurs: [
//       {
//         id: 957546,
//         lieu: "230 RUE HENRI DELAUNAY",
//         codePostal: "13290",
//         ville: "AIX EN PROVENCE",
//         lat: 43.482007,
//         long: 5.392497,
//         codeCommune: "13001",
//         active: true,
//         departementId: 14,
//         typeAdresseOperateurs: ["Lieux d'activité", "Siège social"],
//       },
//     ],
//     productions: [
//       {
//         id: 1153,
//         code: "46.34.11",
//         nom: "Commerce de gros de jus, eaux minérales, boissons rafraîchissantes et autres boissons non alcoolisées",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//     ],
//     activites: [
//       {
//         id: 3,
//         nom: "Distribution",
//       },
//     ],
//     certificats: [
//       {
//         organisme: "Ecocert France",
//         etatCertification: "ENGAGEE",
//         dateSuspension: null,
//         dateArret: null,
//         dateEngagement: "2020-01-24",
//         dateNotification: "2020-01-24T10:57:28.239Z",
//         url: "http://certificat.ecocert.com/index.php?ln=fr&source=agencebio&id=219952",
//       },
//     ],
//     mixite: "Oui",
//   },
//   {
//     id: 64806,
//     raisonSociale: "ALLIANCE OCCITANE",
//     denominationcourante: null,
//     siret: "41938749300044",
//     numeroBio: 162899,
//     telephone: null,
//     email: null,
//     codeNAF: "4621Z",
//     gerant: null,
//     dateMaj: "2019-08-30",
//     telephoneCommerciale: null,
//     reseau: "",
//     categories: [
//       {
//         id: 7,
//         nom: "Grossistes",
//       },
//     ],
//     siteWebs: [],
//     adressesOperateurs: [
//       {
//         id: 64849,
//         lieu: "MAS DE JULIAN",
//         codePostal: "13200",
//         ville: "ARLES",
//         lat: 43.662607,
//         long: 4.481437,
//         codeCommune: "13004",
//         active: true,
//         departementId: 14,
//         typeAdresseOperateurs: ["Lieux de vente", "Siège social"],
//       },
//     ],
//     productions: [
//       {
//         id: 1121,
//         code: "46.21.11",
//         nom: "Commerce de gros de céréales",
//         etatProductions: [
//           {
//             id: 5,
//             etatProduction: "CNS",
//           },
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//       {
//         id: 1171,
//         code: "46.38.29",
//         nom: "Commerce de gros d'autres produits alimentaires n.c.a.",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//     ],
//     activites: [
//       {
//         id: 3,
//         nom: "Distribution",
//       },
//     ],
//     certificats: [
//       {
//         organisme: "Ecocert France",
//         etatCertification: "ARRETEE",
//         dateSuspension: null,
//         dateArret: "2020-12-31",
//         dateEngagement: "2012-07-20",
//         dateNotification: "2012-07-22T22:00:00.000Z",
//         url: "http://certificat.ecocert.com/index.php?ln=fr&source=agencebio&id=124844",
//       },
//     ],
//     mixite: "Oui",
//   },
//   {
//     id: 67133,
//     raisonSociale: "ALPHA OMEGA",
//     denominationcourante: null,
//     siret: "48781642300015",
//     numeroBio: 165478,
//     telephone: null,
//     email: null,
//     codeNAF: "4690Z",
//     gerant: null,
//     dateMaj: "2019-08-30",
//     telephoneCommerciale: null,
//     reseau: "",
//     categories: [
//       {
//         id: 5,
//         nom: "Artisans/commerçants",
//       },
//     ],
//     siteWebs: [],
//     adressesOperateurs: [
//       {
//         id: 67176,
//         lieu: "50B FERDINAND DE LESSEPS",
//         codePostal: "13003",
//         ville: "MARSEILLE",
//         lat: 43.320937,
//         long: 5.37538,
//         codeCommune: "13055",
//         active: true,
//         departementId: 14,
//         typeAdresseOperateurs: ["Siège social"],
//       },
//     ],
//     productions: [],
//     activites: [
//       {
//         id: 3,
//         nom: "Distribution",
//       },
//     ],
//     certificats: [
//       {
//         organisme: "",
//         etatCertification: "ENGAGEE",
//         dateSuspension: null,
//         dateArret: null,
//         dateEngagement: null,
//         dateNotification: "2019-05-06T22:00:00.000Z",
//         url: "",
//       },
//     ],
//     mixite: "",
//   },
//   {
//     id: 83807,
//     raisonSociale: "AMANDERA",
//     denominationcourante: "AMANDERA",
//     siret: "84778308100015",
//     numeroBio: 173465,
//     telephone: null,
//     email: null,
//     codeNAF: "01.25Z",
//     gerant: null,
//     dateMaj: "2023-05-03",
//     telephoneCommerciale: null,
//     reseau: "",
//     categories: [],
//     siteWebs: [],
//     adressesOperateurs: [
//       {
//         id: 953851,
//         lieu: "37 BD ARISTIDE BRIAND",
//         codePostal: "13100",
//         ville: "AIX-EN-PROVENCE",
//         lat: 43.532647,
//         long: 5.449151,
//         codeCommune: "13001",
//         active: true,
//         departementId: 14,
//         typeAdresseOperateurs: ["Lieux d'activité", "Siège social"],
//       },
//     ],
//     productions: [
//       {
//         id: 182,
//         code: "01.21.12",
//         nom: "Raisin de cuve",
//         etatProductions: [
//           {
//             id: 9,
//             etatProduction: "EAC",
//           },
//         ],
//       },
//       {
//         id: 233,
//         code: "01.25.31",
//         nom: "Amandes",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//       {
//         id: 235,
//         code: "01.25.33",
//         nom: "Noisettes",
//         etatProductions: [
//           {
//             id: 1,
//             etatProduction: "C1",
//           },
//           {
//             id: 9,
//             etatProduction: "EAC",
//           },
//         ],
//       },
//       {
//         id: 238,
//         code: "01.25.39",
//         nom: "Autres fruits à coque (à l'exclusion des noix sauvages, arachides et noix de coco)",
//         etatProductions: [
//           {
//             id: 9,
//             etatProduction: "EAC",
//           },
//         ],
//       },
//       {
//         id: 447,
//         code: "01.91",
//         nom: "Jachère, gel entrant en rotation (yc bandes tampon et surfaces non exploitées temporairement)",
//         etatProductions: [
//           {
//             id: 9,
//             etatProduction: "EAC",
//           },
//         ],
//       },
//       {
//         id: 448,
//         code: "01.92",
//         nom: "Gel fixe, friche, gel spécifique n’entrant pas en rotation",
//         etatProductions: [
//           {
//             id: 9,
//             etatProduction: "EAC",
//           },
//         ],
//       },
//       {
//         id: 1319,
//         code: "47.00.12",
//         nom: "Commerce de détail de fruits et légumes de conservation",
//         etatProductions: [
//           {
//             id: 9,
//             etatProduction: "EAC",
//           },
//         ],
//       },
//     ],
//     activites: [
//       {
//         id: 1,
//         nom: "Production",
//       },
//       {
//         id: 3,
//         nom: "Distribution",
//       },
//     ],
//     certificats: [
//       {
//         organisme: "Ecocert France",
//         etatCertification: "ENGAGEE",
//         dateSuspension: null,
//         dateArret: null,
//         dateEngagement: "2019-04-10",
//         dateNotification: "2019-04-02T07:53:07.000Z",
//         url: "http://certificat.ecocert.com/index.php?ln=fr&source=agencebio&id=205098",
//       },
//     ],
//     mixite: "Non",
//   },
//   {
//     id: 97651,
//     raisonSociale: "AMARIS SEAFOOD CORPORATION",
//     denominationcourante: "AMARIS SEAFOOD CORPORATION",
//     siret: "89081295100014",
//     numeroBio: 18935,
//     telephone: null,
//     email: null,
//     codeNAF: "46.38A",
//     gerant: "TOUSSENEL",
//     dateMaj: "2023-03-18",
//     telephoneCommerciale: null,
//     reseau: "",
//     categories: [],
//     siteWebs: [],
//     adressesOperateurs: [
//       {
//         id: 163635,
//         lieu: "1140 RUE ANDRE AMPERE",
//         codePostal: "13290",
//         ville: "AIX-EN-PROVENCE",
//         lat: 43.491378,
//         long: 5.372246,
//         codeCommune: "13001",
//         active: true,
//         departementId: 14,
//         typeAdresseOperateurs: ["Siège social"],
//       },
//       {
//         id: 248361,
//         lieu: "Centre d'Affaire Actimart 1140 Rue André Ampère",
//         codePostal: "13594",
//         ville: "AIX EN PROVENCE",
//         lat: 43.485543,
//         long: 5.38037,
//         codeCommune: "13001",
//         active: true,
//         departementId: 14,
//         typeAdresseOperateurs: ["Lieux d'activité"],
//       },
//     ],
//     productions: [
//       {
//         id: 1331,
//         code: "47.00.24",
//         nom: "Commerce de détail d'autres produits alimentaires n.c.a.",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//     ],
//     activites: [
//       {
//         id: 3,
//         nom: "Distribution",
//       },
//       {
//         id: 4,
//         nom: "Importation",
//       },
//     ],
//     certificats: [
//       {
//         organisme: "Bureau Veritas Certification France",
//         etatCertification: "ENGAGEE",
//         dateSuspension: null,
//         dateArret: null,
//         dateEngagement: "2020-11-15",
//         dateNotification: "2020-11-16T10:44:58.887Z",
//         url: "https://certifie.bureauveritas.fr/organisme/18935",
//       },
//     ],
//     mixite: "Non",
//   },
//   {
//     id: 18325,
//     raisonSociale: "AMBOE",
//     denominationcourante: "AMBOE SCOP / SOL A SOL",
//     siret: "49001924700033",
//     numeroBio: 116383,
//     telephone: null,
//     email: "contact@sol-a-sol.fr",
//     codeNAF: "46.39B",
//     gerant: null,
//     dateMaj: "2023-05-03",
//     telephoneCommerciale: "0484253643",
//     reseau: "",
//     categories: [
//       {
//         id: 4,
//         nom: "Magasins spécialisés",
//       },
//       {
//         id: 7,
//         nom: "Grossistes",
//       },
//     ],
//     siteWebs: [
//       {
//         id: 4324,
//         url: "https://www.facebook.com/solasolfr/",
//         active: true,
//         operateurId: 18325,
//         typeSiteWebId: 2,
//         typeSiteWeb: {
//           id: 2,
//           nom: "Facebook",
//           status: 2,
//         },
//       },
//     ],
//     adressesOperateurs: [
//       {
//         id: 974815,
//         lieu: "258 BD ROMAIN ROLLAND",
//         codePostal: "13009",
//         ville: "MARSEILLE 9",
//         lat: 43.273414,
//         long: 5.412952,
//         codeCommune: "13209",
//         active: true,
//         departementId: 14,
//         typeAdresseOperateurs: ["Lieux d'activité", "Siège social"],
//       },
//     ],
//     productions: [
//       {
//         id: 813,
//         code: "10.83.13",
//         nom: "Thé vert (non fermenté), thé noir (fermenté) et thé partiellement fermenté, en conditionnements inférieurs ou égaux à 3 kg",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//       {
//         id: 814,
//         code: "10.83.14",
//         nom: "Extraits, essences, concentrés et préparations à base de thé ou de maté",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//       {
//         id: 815,
//         code: "10.83.15",
//         nom: "Infusions",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//       {
//         id: 1163,
//         code: "46.37",
//         nom: "Commerce de gros de café, thé, cacao et épices",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//     ],
//     activites: [
//       {
//         id: 2,
//         nom: "Préparation",
//       },
//       {
//         id: 3,
//         nom: "Distribution",
//       },
//     ],
//     certificats: [
//       {
//         organisme: "Ecocert France",
//         etatCertification: "ENGAGEE",
//         dateSuspension: null,
//         dateArret: null,
//         dateEngagement: "2007-03-22",
//         dateNotification: "2007-09-26T22:00:00.000Z",
//         url: "http://certificat.ecocert.com/index.php?ln=fr&source=agencebio&id=63630",
//       },
//     ],
//     mixite: "Oui",
//   },
//   {
//     id: 113471,
//     raisonSociale: "AMS DISTRIB",
//     denominationcourante: "SUPECO GARDANNE -AMS DISTRIB",
//     siret: "83185478100026",
//     numeroBio: 34584,
//     telephone: null,
//     email: null,
//     codeNAF: "47.11D",
//     gerant: "MOREIRA Aurélien",
//     dateMaj: "2023-04-15",
//     telephoneCommerciale: null,
//     reseau: "Carrefour",
//     categories: [
//       {
//         id: 6,
//         nom: "Grandes surfaces généralistes",
//       },
//     ],
//     siteWebs: [],
//     adressesOperateurs: [
//       {
//         id: 282589,
//         lieu: "AV DES ANCIENS COMBATTANTS",
//         codePostal: "13120",
//         ville: "GARDANNE",
//         lat: 43.4529895,
//         long: 5.4752079,
//         codeCommune: "13041",
//         active: true,
//         departementId: 14,
//         typeAdresseOperateurs: ["Lieux d'activité", "Siège social"],
//       },
//     ],
//     productions: [
//       {
//         id: 765,
//         code: "10.71.1",
//         nom: "Pain ; pâtisseries et viennoiseries fraîches",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//       {
//         id: 1331,
//         code: "47.00.24",
//         nom: "Commerce de détail d'autres produits alimentaires n.c.a.",
//         etatProductions: [
//           {
//             id: 6,
//             etatProduction: "AB",
//           },
//         ],
//       },
//     ],
//     activites: [
//       {
//         id: 2,
//         nom: "Préparation",
//       },
//       {
//         id: 3,
//         nom: "Distribution",
//       },
//     ],
//     certificats: [
//       {
//         organisme: "Bureau Veritas Certification France",
//         etatCertification: "ARRETEE",
//         dateSuspension: null,
//         dateArret: "2023-05-13",
//         dateEngagement: "2016-08-08",
//         dateNotification: "2021-10-19T16:29:04.354Z",
//         url: "https://certifie.bureauveritas.fr/organisme/34584",
//       },
//     ],
//     mixite: "Non",
//   },
// ];

// console.log(apiData[0].items[0].denominationcourante);
