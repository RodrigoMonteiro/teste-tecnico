import { useEffect, useState } from "react";
import { Packs } from "../../../model/Packs";
import "./styles.css";
import axios from "axios";
export function TablePacks() {
  const baseApiUrl = "http://localhost:3000/packs";
  const [packsList, setPacksList] = useState<Packs[]>([]);

  useEffect(() => {
    axios
      .get(baseApiUrl)
      .then((response) => setPacksList(response.data))
      .catch((error) => console.error(error));
  }, []);
  return (
    <table className="table-packs-container">
      <thead className="table-packs-header">
        <tr>
          <th className="table-packs coluna-id">id</th>
          <th className="table-packs coluna-idPack">idPack</th>
          <th className="table-packs coluna-idProduto">idProduto</th>
          <th className="table-packs coluna-qtde">Quantidade</th>
        </tr>
      </thead>
      <tbody style={{ textAlign: "center" }}>
        {packsList.map((e) => {
          return (
            <tr
              key={e.id}
              style={{
                textAlign: "center",
                overflow: "hidden",
                fontSize: "1rem",
                backgroundColor: "white",
                color: "#0f0b0f",
                height:'40px'
              }}
            >
              <td>{e.id}</td>
              <td>{e.pack_id}</td>
              <td>{e.product_id}</td>
              <td>{e.qty}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
