import { useState } from "react";
import "./styles.css";
import { TableProducts } from "./TableProducts";
import { TablePacks } from "./TablePacks";
export function Table(props: any) {
  const { theme } = props;
  const [tableProducts, setTableProducts] = useState(true);

  return (
    <div className="table-selection-container">
      <h3>Visualizar tabelas</h3>
      <div className="select-table">
        <button
          className="btn-select-table btn-select-produtos"
          onClick={() => {
            setTableProducts(true);
          }}
          style={{
            transition: "0.125ms",
            backgroundColor: tableProducts ? "#2da77a" : "#a19d9d",
            color: theme ? "#0f0b0f" : "#faf9fa",
          }}
        >
          Produtos
        </button>
        <button
          className="btn-select-table  btn-select-pack"
          onClick={() => {
            setTableProducts(false);
          }}
          style={{
            transition: "0.250ms",
            backgroundColor: tableProducts ? "#a19d9d" : "#2da77a",
            color: theme ? "#0f0b0f" : "#faf9fa",
          }}
        >
          Packs de produtos
        </button>
      </div>
      <div className="table-content">
        {tableProducts ? <TableProducts/> : <TablePacks/>}
      </div>
    </div>
  );
}
