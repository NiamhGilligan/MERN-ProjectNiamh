import axios from 'axios';

class ItemService {

    updateDate(data, id) {
        axios.post('/api/update/'+id, {
            title: data
        }).then(() => {

          alert('Lesson Plan has been edited');

          window.location.reload();
        })
        .then((response) => {
            this.setState({
                title: response.data

            })


        })
        .catch((error) => {
            console.log(error)
        })
    }

    deleteData(id) {
        axios.get('/api/delete/'+id)
        .then(() => {
            console.log('Deleted');
          alert('Lesson Plan has been deleted');

          window.location.reload();
        })
        .catch((error) => {
            console.log(error)
        })
    }
}

export default ItemService;
