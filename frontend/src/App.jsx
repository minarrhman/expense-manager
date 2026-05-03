import Card from "./Components/Cards";
import Navbar from "./Components/Navbar";

function App() {
  return (
    
    <div className="flex">
      <Navbar/>


      <div className="flex-1 bg-gray-100 min-h-screen p-6">
          <h1 className="text-2xl font-bold mb-6">
            Welcome Back, Minar!
          </h1>

          <div className="grid grid-cols-4 gap-4">
            <Card
            title='Total Balance'
            amount="12000"
            change="+12"/>
            <Card
            title='Monthly Income'
            amount="15000"
            change="+16"/>
            <Card
            title='Total Balance'
            amount="7000"
            change="+11"/>
            <Card
            title='Saving Goals'
            amount="2000"
            change="+62"/>
          </div>
        </div>
      </div>
  );
}

export default App;