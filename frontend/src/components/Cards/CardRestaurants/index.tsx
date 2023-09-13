import { useEffect, useState } from 'react'
import { RestaurantsData } from "../../../interfaces/restaurantsData"
import FormGroup from "../../FormGroup"
import { Container, Filtro, Title } from "./styles"
import { AiFillStar } from 'react-icons/ai'
import { BsFilterRight, BsArrowDown, BsArrowUp } from 'react-icons/bs'
import { BiFoodMenu } from 'react-icons/bi'

interface CardRestaurantsProps {
  cardInfos: RestaurantsData[]
}

export default function CardRestaurants({ cardInfos }: CardRestaurantsProps) {
  const [grupoSelecionado, setGrupoSelecionado] = useState("Selecione o grupo");

  const [restaurantesFiltrados, setRestaurantesFiltrados] = useState<RestaurantsData[]>([])

  const [ordemDescendente, setOrdemDescendente] = useState(true)

  useEffect(() => {
    setRestaurantesFiltrados(cardInfos)
  }, [cardInfos])

  const grupos = Array.from(new Set(cardInfos.map(item => item.grupo)));

  const handleChangeGrupo = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGrupoSelecionado(e.target.value);

    if (e.target.value === "Selecione o grupo" || e.target.value === "Todos") {
      setRestaurantesFiltrados(cardInfos);
    } else {
      const filtrados = cardInfos.filter((item) => item.grupo === e.target.value);
      setRestaurantesFiltrados(filtrados);
    }

    setOrdemDescendente(true)
  };

  const handleChangeOrdenacao = () => {
    setOrdemDescendente(!ordemDescendente);

    setRestaurantesFiltrados((restaurantesFiltrados) =>
      [...restaurantesFiltrados].sort((a, b) => {
        return ordemDescendente ? b.nota - a.nota : a.nota - b.nota;
      })
    );
  };

  const handleChangeBusca = (e: React.ChangeEvent<HTMLInputElement>) => {

    const filteredResults = cardInfos.filter((item) =>
      item.nome.toLowerCase().includes((e.target.value.trim()).toLowerCase())
    );

    if (grupoSelecionado !== "Todos" && grupoSelecionado !== "Selecione o grupo") {
      const filtradosPorGrupo = filteredResults.filter((item) => item.grupo === grupoSelecionado);
      setRestaurantesFiltrados(filtradosPorGrupo);
    } else {
      setRestaurantesFiltrados(filteredResults);
    }
  }

  return (
    <>
      <Title>Restaurantes</Title>

      <Filtro>
        <div className="filtro">
          <span>Filtros</span>
          <BsFilterRight style={{ "cursor": "default" }} />
        </div>

        <div className="filtro" onClick={() => handleChangeOrdenacao()}>
          <span>Avaliação</span>
          {ordemDescendente ? <BsArrowDown /> : <BsArrowUp />}
        </div>

        <select className="selectFiltro" value={grupoSelecionado} onChange={handleChangeGrupo}>
          <option disabled>Selecione o grupo</option>
          <option>Todos</option>
          {grupos.map((grupo) => (
            <option key={grupo}>{grupo}</option>
          ))}
        </select>

        <FormGroup
          classNameDiv='col-12'
          typeInput='text'
          idInput='pesquisar'
          placeholderInput=''
          htmlFor='pesquisar'
          textLabel='Pesquisar'
          onChangeInput={(e) => handleChangeBusca(e)}
          hasSearchIcon={true}
        />
      </Filtro>

      <Container>
        {restaurantesFiltrados.length > 0 ?
          restaurantesFiltrados.map((card) => (
            <div key={card.id} className="card">
              <img src={card.imagem} alt={card.nome}></img>

              <div>
                <h3>{card.nome}</h3>

                <div className="avaliacao">
                  <AiFillStar /> <span className="nota">{card.nota}</span>
                  <span> • {card.grupo}</span>
                </div>

                <button>
                  <BiFoodMenu />
                  <span>Cardápio</span>
                </button>
              </div>
            </div>
          )) :
          <h3>Nenhum restaurante encontrado</h3>}
      </Container>
    </>
  )
}
