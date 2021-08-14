import React, {useState} from "react";
import { TextField, Button, FormLabel } from '@material-ui/core';

function Initial({stateChanger}) {
  return (
    <FormLabel>
        <div>
          <TextField label="Entrer votre prénom" />
        </div>
        <div style={{padding: 30}}>
          <Button variant="contained" onClick={() => stateChanger(1)}>Jouer</Button>
        </div>
    </FormLabel>
  );
}

export default Initial;
