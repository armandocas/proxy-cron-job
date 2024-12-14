import { getFirestore, collection, setDoc, doc, query, orderBy, limit, getDocs } from "firebase/firestore";
import axios from "axios";
import firebaseApp from "../utils/firebase.js"; // Certifique-se que o arquivo firebase.js está configurado corretamente

const db = getFirestore(firebaseApp);

// Função para obter o último ID no Firestore
async function obterUltimoId() {
  try {
    const q = query(
      collection(db, "historico_lotofacil"),
      orderBy("sorteio", "desc"),
      limit(1)
    );

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const ultimoDocumento = querySnapshot.docs[0].data();
      return ultimoDocumento.sorteio; // Retorna o maior número de sorteio
    } else {
      return 0; // Caso não tenha nenhum registro
    }
  } catch (error) {
    console.error("Erro ao obter o último ID:", error.message);
    throw new Error("Erro ao obter o último ID");
  }
}

// Função para coletar novos dados e salvar no Firestore
async function coletarDadosLotoFacil() {
  const baseUrl = "http://localhost:4000/api/lotofacil"; // Atualizado para usar o proxy
  const dadosColetados = [];

  try {
    // Obtém o último ID
    const ultimoId = await obterUltimoId();
    console.log("Último ID encontrado:", ultimoId);

    // Inicia o loop a partir do próximo ID
    for (let id = ultimoId + 1; id <= ultimoId + 5; id++) { // Ajuste o intervalo conforme necessário
      console.log("Coletando dados do sorteio", id);

      try {
        const response = await axios.get(`${baseUrl}/${id}`);
        if (response.status === 200) {
          const dados = response.data;

          const documento = {
            sorteio: dados.s,
            data_do_sorteio: dados.d,
            numeros_sorteados: dados.na.split("-"),
            premios: {
              v1a: dados.v1a,
              w1a: dados.w1a,
              v2a: dados.v2a,
              w2a: dados.w2a,
              v3a: dados.v3a,
              w3a: dados.w3a,
              v4a: dados.v4a,
              w4a: dados.w4a,
              v5a: dados.v5a,
              w5a: dados.w5a,
            },
            data_de_fechamento: dados.nxd,
            valor_do_proximo_premio: dados.nxv,
            cidades: dados.city.map(city => ({
              cidade: city.c,
              estado: city.u,
              ganhadores: city.w,
            })),
            atualizado_em: new Date().toISOString(),
          };

          await setDoc(doc(collection(db, "historico_lotofacil"), String(dados.s)), documento);
          dadosColetados.push(documento);
        }
      } catch (error) {
        console.error(`Erro ao coletar dados para o sorteio ${id}:`, error.message);
      }
    }
  } catch (error) {
    console.error("Erro geral ao coletar dados:", error.message);
  }

  return dadosColetados;
}

export default coletarDadosLotoFacil;
