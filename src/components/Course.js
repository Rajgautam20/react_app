import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container ,Paper,Button} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
     
    },
  },
}));

export default function Course() {
    const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
    const[id,setId]=useState('')
    const[title,setTitle]=useState('')
    const[description,setDescription]=useState('')
    const[course,setCourse]=useState([])
    const classes = useStyles();

  const handleClick=(e)=>{
    e.preventDefault()
    const course={id,title,description}
    console.log(course)
    fetch("http://localhost:8080/courses",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(course)

  }).then(()=>{
    console.log("New Course added")
  })
}

useEffect(()=>{
  fetch("http://localhost:8080/courses")
  .then(res=>res.json())
  .then((result)=>{
    setCourse(result);
  }
)
},[])
  return (

    <Container>
        <Paper elevation={3} style={paperStyle}>
            <h1 style={{color:"blue"}}><u>Add Course</u></h1>

    <form className={classes.root} noValidate autoComplete="off">
    
    <TextField id="outlined-basic" label="Course Id" variant="outlined" fullWidth 
      value={id}
      onChange={(e)=>setId(e.target.value)}
      />

      <TextField id="outlined-basic" label="Course Title" variant="outlined" fullWidth 
      value={title}
      onChange={(e)=>setTitle(e.target.value)}
      />
      <TextField id="outlined-basic" label="Course Description" variant="outlined" fullWidth
      value={description}
      onChange={(e)=>setDescription(e.target.value)}
      />
      <Button variant="contained" color="secondary" onClick={handleClick}>
  Submit
</Button>
    </form>
   
    </Paper>
    <h1>Course</h1>

    <Paper elevation={3} style={paperStyle}>

      {course.map(course=>(
        <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={course.id}>
         id:{course.id}<br/>
         title:{course.title}<br/>
         description:{course.description}

        </Paper>
      ))
}


    </Paper>



    </Container>
  );
}