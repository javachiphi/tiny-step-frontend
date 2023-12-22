import React from 'react';
import { Modal, Input, Button, ModalDialog, DialogTitle, DialogContent} from '@mui/joy';

export default function OptionModal({
  open,
  setOpen,
  newOption,
  setNewOption,
  handleAddOption
}) {

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
       <ModalDialog>
        <DialogTitle>Add new option</DialogTitle>
        <DialogContent>
        <Input 
          label="New Option" 
          value={newOption} 
          onChange={(e) => setNewOption(e.target.value)} 
        />
        <Button onClick={handleAddOption}>Add</Button>
        </DialogContent>
      </ModalDialog>
  </Modal>
  )
}