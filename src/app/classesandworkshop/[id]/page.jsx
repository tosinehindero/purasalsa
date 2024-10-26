export default async function page({params}){

    const {id} = await params;


    return (
      <div>
        <h1 className="text-2xl">This is: {id}</h1>
      </div>
    )
}




