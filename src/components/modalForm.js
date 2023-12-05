import React, {useState} from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import TagForm from './tagForm';

export default function ModalForm({modalOpen, setModalOpen, mode, editTagData}) {

  return (
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'sm',
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
            <TagForm mode={mode} editTagData={editTagData} setModalOpen={setModalOpen}/> 
        </Sheet>
      </Modal>
  );
}