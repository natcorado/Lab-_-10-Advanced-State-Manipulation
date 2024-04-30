import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import TaskIcon from '@mui/icons-material/Task';
import Typography from '@mui/material/Typography';

function App() {
  const [task, setTask] = useState('');
  const [list, setList] = useState([]);
  const [taskCount, setTaskCount] = useState(list.length);

  function handleTaskInput(event) {
    setTask(event.target.value);
  }

  function handleAdd() {
    if (task.trim() != '') {
      setList((prevList) => [...prevList, task]);
      setTask('');
      setTaskCount((prevCount) => prevCount + 1);
    }
  }

  function handleDelete(index) {
    setList((prevList) => {
      const newList = [...prevList];
      newList.splice(index, 1);
      return newList;
    });

    setTaskCount((prevCount) => prevCount - 1);
  }

  function handleDeleteAll() {
    setList([]);
    setTaskCount(0);
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '20px',
      }}
    >
      <h2 style={{ fontFamily: 'Arial, sans-serif' }}>Mini Task Dashboard</h2>
      <Typography variant="body1" gutterBottom>
        {taskCount === 0
          ? 'No tasks pending'
          : taskCount === 1
          ? `${taskCount} pending task`
          : `${taskCount} pending tasks`}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={8} container>
          <TextField
            value={task}
            onChange={handleTaskInput}
            label="Enter a task"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4} container>
          <Button variant="outlined" fullWidth onClick={handleAdd}>
            Add Task
          </Button>
        </Grid>
      </Grid>
      <Box height={10} />
      <Button
        variant="outlined"
        color="error"
        fullWidth
        onClick={handleDeleteAll}
      >
        Delete All Tasks
      </Button>
      <Box height={20} />

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Tasks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((task, index) => (
              <TableRow key={index}>
                <TableCell>
                  <IconButton aria-label="delete" size="small">
                    <TaskIcon fontSize="inherit" size="small" />
                  </IconButton>
                  {task}
                </TableCell>
                <TableCell style={{ width: '5%', textAlign: 'right' }}>
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={handleDelete}
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default App;
