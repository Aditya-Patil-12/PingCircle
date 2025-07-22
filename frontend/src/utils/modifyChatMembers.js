export const modifyChatMembers =  ({members,admins}) =>{
    let adminIds =  new Set(admins);
    let modifiedMembers = 
    members.map((member) => {return {...member,isAdmin:adminIds.has(member._id)}})
    return modifiedMembers;
}
export default modifyChatMembers;