export default function AddAttackFetch(event, id, createAttack, serverAddress) {
  event.preventDefault();

  let formData = new FormData(event.target);

  let dataToSend = {
    wasAt: `${formData.get('date')} ${formData.get('time')}`,
    selectedReasons: formData.get('reason')
  }

  fetch(`${serverAddress}/attackrecords/create/${id}`, {
    method: 'POST',
    body: dataToSend,
  }).then(responce => {
    return responce.json
  }).then(data => {

    createAttack(dataToSend)
    event.target.reset();

  }).catch(err => {
    alert(err.message);
  });
}

