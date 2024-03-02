import { Pinecone } from "@pinecone-database/pinecone";
import { Configuration } from "@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch";



const initpine = async(nameSpace)=>{
    // await Pinecone(Configuration:{
    //     apiKey: process.env.PINECONE_API_KEY,
    //     environment:process.env.PINECONE_BASE_URL,
    //   })
    const pinecone = new Pinecone({
      apiKey:'214e298b-a321-4ab4-98db-e3312cc70304',
      //environment:'us-west4-gcp-free',
    });
    // const indexes = await pinecone.listIndexes() 
    // console.log(indexes)  
    // const config = await pinecone.describeIndex('edoc');
    // console.log(config)    

    const index = pinecone.index('edoc').namespace(nameSpace);
    ;
    return index

}
export default initpine