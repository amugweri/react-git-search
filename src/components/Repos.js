import React from 'react'
import styled from 'styled-components'
import { GithubContext } from '../context/context'
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts'
const Repos = () => {
  const { repos } = React.useContext(GithubContext)
  const languages = repos.reduce((total, item) => {
    const { language, stargazers_count } = item
    if (!language) return total
    if (!total[language]) {
      total[language] = { label: language, value: 1, stars: stargazers_count }
    } else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count,
      }
    }

    return total
  }, {})
  //  console.log(languages );
  const mostUsed = Object.values(languages)
    .sort((a, b) => {
      return b.value - a.value
    })
    .slice(0, 5)

  //  console.log(languages );
  const mostPopular = Object.values(languages)
    .sort((a, b) => {
      return b.stars - a.stars
    })
    .slice(0, 5)
    .map((item) => {
      return { ...item, value: item.stars }
    })
    .slice(0, 5)
// console.log(repos);
  let { stars, forks } = repos.reduce(
    (total, item) => {
      const { stargazers_count, name, forks } = item
      total.stars[stargazers_count] = { label: name, value:stargazers_count };
      total.forks[forks] = { label: name, value:forks };
      return total;
    },
    {
    stars: {},
    forks: {}
    }
  )
  // console.log(stars)



 stars= Object.values(stars).reverse(-5).slice(0,5);
 forks= Object.values(forks).reverse(-5).slice(0,5);
  // console.log(forks)
  // console.log(chartData);
  // STEP 2 - Chart Data
  const chartData = [
    {
      label: 'HTML',
      value: '13',
    },
    {
      label: 'CSS',
      value: '30',
    },
    {
      label: 'Javascript',
      value: '80',
    },
  ]

  // const chartData = [

  return (
    <section className="section">
      <Wrapper className="section-center">
        <Pie3D data={mostUsed}></Pie3D>
        <div></div>
        <Column3D data={stars} />
        <Doughnut2D data={mostPopular} />
        <Bar3D data={forks} />
        <div></div>
        {/* <ExampleChart data={chartData}></ExampleChart>; */}
      </Wrapper>
    </section>
  )

  // return <h2>repos component</h2>;
}

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`

export default Repos
