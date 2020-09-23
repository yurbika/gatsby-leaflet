const getYoutubeData = async id => {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?id=${id}&part=contentDetails&part=snippet&key=AIzaSyBWyJ8_5gt686cUsIlEymxe7ho9M0I56TY`
  )
  const json = await res.json()
  console.log(json)
}

export const getData = routes => {
  const videos = {}
  let cnt = 0

  for (let i of routes) {
    if (i["_popup"] && i["_popup"]["_content"]) {
      let title = i["_popup"]["_content"].match(/(?<=<h2>)(.*)(?=<\/h2>)/gm)[0]
      console.log(i["_popup"]["_content"])
      let id = i["_popup"]["_content"].match(/(?<=v=)[-\w]{11}/gm)
      let description = i["_popup"]["_content"].match(/(?<=v=)[-\w]{11}/gm)
      let km = i["_popup"]["_content"].match(
        /(?<=Distance in km: )([0-9]*[,])?[0-9]+/gm
      )
      if (km) {
        console.log(km)
        console.log(i["_popup"]["_content"])
      }
      console.log(getYoutubeData(id))
      let videoLength = ""
    }
  }
}
