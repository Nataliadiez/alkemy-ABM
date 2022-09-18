import {usestate} from 'react'


    const entryResult = (operations) => {
        var totalEntry = 0;
        for(let i=0; i<operations.length; i++){
            if(operations[i].type==='entry'){
                totalEntry += parseInt(operations[i].amount)
            }
        }
        return(totalEntry)
    }
    

    const egressResult = (operations) => {
        var totalEgress = 0
        for(let i=0; i<operations.length; i++){
            if(operations[i].type==='egress'){
                totalEgress += parseInt(operations[i].amount)
            }
        }
        return(totalEgress)
    }

export {entryResult, egressResult}