const socket = io()

//Elements
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton =$messageForm.querySelector('button')
const $sendLocationButton =document.querySelector('#send-location')
const $messages = document.querySelector('#messages')

//Templates
const messageTemplates = document.querySelector('#message-template').innerHTML
const locationMessageTemplate = document.querySelector('#location-message-template').innerHTML
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML


//Options
const {username,room} = Qs.parse(location.search , {ignoreQueryPrefix : true})

const autoscroll = ()=> {
   //New message element
   const $newMessage = $messages.lastElementChild

   //Height of the last message
   const newMessageStyles = getComputedStyle($newMessage)
   const newMessageMargin = parseInt(newMessageStyles.marginBottom)
   const newMessageHeight = $newMessage.offsetHeight + newMessageMargin
  //  console.log(newMessageMargin)
  //visible Heights
  const visibleHeight = $messages.offsetHeight

  //Height of message container
  const containerHeight = $messages.scrollHeight 

  // how far have i scrolled
  const scrollOffset = $messages.scrollTop + visibleHeight

  if(containerHeight - newMessageHeight <= scrollOffset){
      $messages.scrollTop = $messages.scrollHeight
  }
}

socket.on('message',(message) =>{
    console.log(message)
     const html = Mustache.render(messageTemplates,{
    username:message,username,
       message : message.text,
       createdAt: moment(message.createdAt).format('h:mm A')
     })
     $messages.insertAdjacentHTML('beforeend',html)
     autoscroll()
})



socket.on('locationMessage',(message)=>{
console.log(message)
const html = Mustache.render(locationMessageTemplate,{
  username:message.username,
    url:message.url,
    createdAt:moment(message.createdAt).format('h:mm A')
})
$messages.insertAdjacentHTML('beforeend',html)
autoscroll()
})

socket.on('roomData',({room,users}) => {
     const html = Mustache.render(sidebarTemplate,{
     room,
     users
     })
     document.querySelector('#sidebar').innerHTML = html
})

$messageForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    $messageFormButton.setAttribute('disabled','disabled')
    
    //disable
    const message = e.target.elements.message.value
    
    socket.emit('sendMessage',message,(error)=>{
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()
        //enable
       if(error){
          return console.log(error)
       }
       console.log('Message Delivered')
    })
})



$sendLocationButton.addEventListener('click',()=>{
if(!navigator.geolocation){
    return alert('Geolocation is not supported by your browser')
}
$sendLocationButton.setAttribute('disabled','disabled')

navigator.geolocation.getCurrentPosition((position)=>{
    //   console.log(position)
      socket.emit('sendlocation',{
         latitude:position.coords.latitude,
         longiude:position.coords.longitude
      },()=>{
        $sendLocationButton.removeAttribute('disabled')
        console.log('Location shared')
      })
})
})

socket.emit('join',{ username,room},(error) => {
   if(error){
    alert(error)
    location.href = '/'
   }
})

// socket.on('countUpdated',(count) =>{
//     console.log('The count has been updated',count)
// })  

// document.querySelector('#increment').addEventListener('click',()=>{
// console.log('Clicked')
// socket.emit('increment')
// })