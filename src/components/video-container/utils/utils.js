const getYoutubeData = async id => {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?id=${id}&part=contentDetails&part=snippet&key=AIzaSyBWyJ8_5gt686cUsIlEymxe7ho9M0I56TY`
  )
  const json = await res.json()
  const data = json.items[0]
  //console.log(data)
  let time = ""
  if (data) {
    time = data.contentDetails.duration
      .replace("PT", "")
      .replace("H", ":")
      .replace("M", ":")
      .replace("S", "")
      .split(":")
    for (let i = 0; i < time.length; i++) {
      if (time[i].length == 1) time[i] = "0" + time[i]
    }
    time = time.join(":")
  }
  let description = ""
  if (data) description = data.snippet.description

  return [time, description]
}

export const getData = routes => {
  const videos = []

  for (let i of routes) {
    if (i["_popup"] && i["_popup"]["_content"]) {
      //let description = i["_popup"]["_content"].match(/(?<=v=)[-\w]{11}/gm)
      //console.log(i["_popup"]["_content"])
      let h1 = i["_popup"]["_content"].match(/(?<=<h2>)(.*)(?=<\/h2>)/gm)[0]
      let id = i["_popup"]["_content"].match(/(?<=v=)[-\w]{11}/gm)
      let km = i["_popup"]["_content"].match(
        /(?<=Distance in km: )([0-9]*[,])?[0-9]+/gm
      )
      if (km === "") {
        km = "-"
      }

      getYoutubeData(id).then(data => {
        videos.push({
          h1: h1,
          id: id,
          km: km,
          videoLength: data[0],
          description: data[1],
        })
      })
    }
  }
  console.log(videos)
}
