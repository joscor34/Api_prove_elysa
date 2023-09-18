let userController = {
  getUserById: (id: string) => {
    if(!id){
      throw new Error("Not id found.");
    }
    return `Your ID is: ${id}`
  },

  signIn: async (user_data: any) => {
    var hash : string = '$2b$04$Hfe9nL.ow96xUWlng03GxuZT.JfBlPjWc9WEwl7buGHYGsgwpJRza'
    if(!user_data.name || !user_data.password){
      throw new Error("Not email or password")
    }
    console.log(user_data.password)
    const isMatch = await Bun.password.verify(user_data.password, hash);
    console.log(isMatch)
    return isMatch
  },
  isSignIn: (headers: any) => {
    console.log(headers)
    return false
  }
}

module.exports = userController;