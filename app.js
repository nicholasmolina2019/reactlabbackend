fetch('http://localhost:4000/people', {
    'method': 'POST',
    'headers':{
        'Content-type': 'Application/json',
    },
    
    'body': JSON.stringify({
        name: 'Ashley Sands',
        title: 'Software Engineer'
    })
})
.then(res => res.json())
.then(data => console.log(data));