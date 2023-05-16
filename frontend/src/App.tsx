import "./App.css";
import { useState } from "react";
import { Header } from "./components/Header";
import { Table } from "./components/Table";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme, lightTheme } from "./styles/theme";
import CssBaseline from "@mui/material/CssBaseline";
import {Products} from './model/Products'
import axios from "axios";

interface dataFile {
  product_code: string;
  new_price: number;
}

function App() {
  const baseApiURL = "http://localhost:3000/products";
  const [file, setFile] = useState("");
  const [isValidFile, setIsValidFile] = useState(false);
  const [isAbleUpdateTable, setIsAbleUpdateTable] = useState(false);
  const [Product, setProduct] = useState<Products[]>([])
  const [dataFromFile, setDataFromFile] = useState<dataFile>({
    product_code: "",
    new_price: 0,
  });
  const [isLightTheme, setIsLightTheme] = useState(true);

  function handleChangeTheme() {
    setIsLightTheme(!isLightTheme);
  }

  const handleValidarArquivoClick = async () => {
    try {
      const response = await axios.get(
        `${baseApiURL}/${dataFromFile.product_code}`
      );
      if (response.status === 200) {
        setProduct(response.data)
        const product = response.data;
  
        if (dataFromFile.new_price <= product.cost_price) {
          console.error("O novo valor é menor que o valor de compra.");
          return;
        }
        const upperLimit = +product.sales_price * 1.1;
        const lowerLimit = +product.sales_price * 0.9;
        if (
          dataFromFile.new_price > upperLimit ||
          dataFromFile.new_price <= lowerLimit
        ) {
          console.error(
            `O novo valor para atualização do produto está inválido. O preço deve está entre:  ${lowerLimit.toFixed(
              2
            )} e ${upperLimit.toFixed(2)}`
          );
          return;
        }
        console.log(
          "O valor pode ser atualizado!",
          "upper: ",
          upperLimit,
          "lower: ",
          lowerLimit,
          "novo preco",
          dataFromFile.new_price,
          "preco do produto",
          product.sales_price
        );
        setIsAbleUpdateTable(true);
      } else {
        console.error("Error ao obter os dados.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileInputChange = (event: any) => {
    setIsValidFile(true);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const contents = reader.result;
      if (typeof contents === "string") {
        setFile(file.name);
        const arrayParts = contents.split(",");
        const [part1, part2] = arrayParts;
        setDataFromFile({
          product_code: part1,
          new_price: Number(part2),
        });
      }
    };
    reader.readAsText(file);
  };

  return (
    <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
      <div className="app-container">
        <Header changeTheme={handleChangeTheme} theme={isLightTheme}></Header>
        <div className="selection-container">
          <div className="selection-options-container">
            <div className="selection-options-select-file">
              <h3>1. Selecione o arquivo</h3>
              <div
                className="select-file-content"
                style={{
                  color: "#0f0b0f",
                  backgroundColor: "#faf9fa",
                }}
              >
                {dataFromFile.product_code.length == 0
                  ? "Selecione um arquivo."
                  : file}
              </div>
              <label className="select-file-content-btn" htmlFor="file-input">
                Selecionar arquivo
              </label>
              <input
                id="file-input"
                type="file"
                accept=".csv"
                onChange={handleFileInputChange}
                style={{ display: "none" }}
              />
            </div>

            <div className="selection-options-validar-data">
              <h3>2. Valide os dados</h3>
              <div
                className="select-validar-data"
                style={{
                  color: "#0f0b0f",
                  backgroundColor: "#faf9fa",
                }}
              >
                {dataFromFile.product_code.length == 0
                  ? "Selecione previamente um arquivo, para realizar a validação."
                  : JSON.stringify(dataFromFile)}
              </div>
              <button
                className={
                  isValidFile
                    ? "select-validar-data-btn"
                    : "select-validar-data-btn disabled-button"
                }
                style={{
                  color: isLightTheme ? "#0f0b0f" : "#faf9fa",
                }}
                onClick={handleValidarArquivoClick}
                disabled={!isValidFile}
              >
                Validar arquivo
              </button>
            </div>

            <div className="selection-options-atualizar-tabela">
              <h3>3. Realize as alterações</h3>
              <button
                className={
                  isAbleUpdateTable
                    ? "selection-options-atualizar-tabela-btn"
                    : "selection-options-atualizar-tabela-btn disabled-button"
                }
                style={{
                  color: isLightTheme ? "#0f0b0f" : "#faf9fa",
                }}
                disabled={!isAbleUpdateTable}
              >
                Atualizar tabela
              </button>
            </div>
          </div>
          <div className="table-data-container">
            <Table theme={isLightTheme}></Table>
          </div>
        </div>
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
