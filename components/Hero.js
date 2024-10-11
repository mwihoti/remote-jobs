export default function Hero() {

return (
    <section className="py-12:">
        <h1 className="text-4xl font-bold text-center">
            Find your next <br/> dream job
        </h1>
       {/*  <p className="text-center text-gray-700 mt-4">
            lorem ipsum dolor sit amet, consectetur adipiscing elit. <br/>
            Vestibulum id purus sit amet ligula tincidunt lacinia. <br/>
            Donec elementum, enim ut luctus ultricies, <br/>
            nunc ex tincidunt lacus

            </p>*/}
        <form className="flex gap-2 mt-4 max-w-md mx-auto">
            <input 
            type="search"
            className="border border-gray-400 w-full py-2 px-3 rounded-md"
            placeholder="Search phrase..."/>
            <button className="py-2 bg-blue-600 text-white  px-4 rounded">
                Search
            </button>
        </form>
    </section>
)
}