import {db} from '../firebase'


export  async function saveActivity(activity){
    const activityRef = db.collection('activities');

    await activityRef.doc().set(activity);
}

export  async function saveMachine(machine){
    const machineRef = db.collection('machines');

    await machineRef.doc().set(machine);
}

export default async function saveAnomally(anomally){
    const anomallyRef = db.collection('anomalies');

    await anomallyRef.doc().set(anomally);
}