import { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import { Products } from "../../../model/Products";

export function TableProducts() {
  const baseApiUrl = "http://localhost:3000/products";
  const [productList, setProductList] = useState<Products[]>([]);

  useEffect(() => {
    axios
      .get(baseApiUrl)
      .then((response) => setProductList(response.data))
      .catch((error) => console.error(error));
  }, [productList]);

  return (
    <div className="table-products-container">
      <table>
        <thead className="table-products-header">
          <tr>
            <th className="tabela-products coluna-codigo">Código</th>
            <th className="tabela-products coluna-nome">Nome</th>
            <th className="tabela-products coluna-compra">Valor Compra</th>
            <th className="tabela-products coluna-revenda">Valor Revenda</th>
          </tr>
        </thead>
        <tbody className="table-products-body">
          {productList.map((e) => {
            return (
              <tr
                key={e.code}
                style={{
                  textAlign: "center",
                  fontSize: "1rem",
                  backgroundColor: "white",
                  color: "#0f0b0f",
                  height: "40px",
                }}
              >
                <td>{e.code}</td>
                <td>{e.name}</td>
                <td>{e.cost_price}</td>
                <td>{e.sales_price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
