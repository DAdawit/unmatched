import axios from 'axios'
const state={

}
const getters={

}

const actions ={
    async AddAdvert({},data){
        // console.log('hello');
        await axios.post('adverts',data).then((res)=>{
            console.log(res.data)
        })
    }

}

const mutations={

}


export default{
    state,getters,actions,mutations,namespaced:true
}