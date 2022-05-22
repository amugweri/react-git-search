import React from 'react';
import { Info, Repos, User, Search, Navbar } from '../components';
import loadingImage from '../images/preloader.gif';
import { GithubContext } from '../context/context';
const Dashboard = () => {
  const {isLoading} = React.useContext(GithubContext);
  if (isLoading){
    console.log("IT I SNOT LOADING");
    return <main>
      <Navbar/>
      
      <Search/>
      <img src={loadingImage} className='loading-img' alt='loding'/>
    </main>
  }
  return (
    <main>
      <Navbar/>
      <Search/>
      <Info/>
      <User/>
      <Repos></Repos>
      <h2>Dashboard Page</h2>
    </main>
  );
};

export default Dashboard;
