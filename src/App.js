
import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import httpClient from 'axios'
import {
    Button,ButtonGroup,
    Form,FormGroup,ControlLabel,
    FormControl,HelpBlock,
    Checkbox,Radio,Grid,Row,Col,
    Table,Modal
} from 'react-bootstrap';


class App extends Component {

    state = {
        name: "",
        color: "",
        movies: [],
        gender: "",
        records:[],
        show: false,
        selectedName: "",
        selectedColor: "",
        selectedMovies: [],
        selectedGender: "",
        suggestion: "",
        selectedId: ""
    };

    componentDidMount(){

        this.refreshData();
    }

     refreshData=()=>{

         httpClient.get('http://localhost:3004/surveys')
             .then((response)=> {
                 var data =response.data;
                 this.setState({
                     records:data.reverse()
                 })

             }).catch((error)=> {

             });

     };

    onChange = (fieldName)=> {
        return (event)=> {

            console.log(event.target.value);
            var state = this.state;
            state[fieldName] = event.target.value;
            this.setState(state);
        }
    };

    modalonChange = (fieldName)=> {
        return (event)=> {

            console.log(event.target.value);
            var state = this.state;
            state[fieldName] = event.target.value;
            this.setState(state);
        }
    };

    checkboxChange = (fieldName)=> {
        return (event)=> {
            var targetArray = this.state[fieldName];
            if (targetArray.indexOf(event.target.value) >= 0)
                targetArray.splice(
                    targetArray.indexOf(event.target.value),
                    1
                );
            else
                targetArray.push(event.target.value);

            var state = this.state;
            state[fieldName] = targetArray;
            this.setState(state);
        }
    };

    modalcheckboxChange = (fieldName)=> {
        return (event)=> {
            var targetArray = this.state[fieldName];
            if (targetArray.indexOf(event.target.value) >= 0)
                targetArray.splice(
                    targetArray.indexOf(event.target.value),
                    1
                );
            else
                targetArray.push(event.target.value);

            var state = this.state.selectedMovies;
            state[fieldName] = targetArray;
            this.setState(state.selectedMovies);
        }
    };


    saveSurvey = ()=> {

       
        var data = {name: this.state.name,
                    color: this.state.color,
                    gender: this.state.gender,
                    movies: this.state.movies,
                    suggestion: this.state.suggestion};
         console.log(data);
         delete data.records;

        httpClient.post('http://localhost:3004/surveys',
         data)
            .then((response)=> {
                this.refreshData();
            }).catch((error)=> {

            });

    };

    deleteItem = (id)=>{

        return ()=>{

            httpClient.delete('http://localhost:3004/surveys/'+ id )
                .then((response)=> {
                    console.log('delete');
                    this.refreshData();
                }).catch((error)=> {

                });

        };
    };
    
    editItem = (id) =>{
        return ()=> {
            
            httpClient.get('http://localhost:3004/surveys/'+id)
                .then((response)=> {
                    console.log('edit');
                    var data = response.data
                    console.log(response.data);
                    this.setState({
                        name: data.name,
                        color: data.color,
                        
                    })
                }).catch((error)=>{
                    
                });
        };
    };

    openModal = (id)=>{

            return ()=>{
                this.setState({
                    show: true
                })

                 httpClient.get('http://localhost:3004/surveys/'+id)
                .then((response)=> {
                    var data = response.data
                    this.setState({
                        selectedName: data.name,
                        selectedColor: data.color,
                        selectedMovies: data.movies,
                        selectedGender: data.gender,
                        selectedSuggestion: data.suggestion,
                        selectedId: data.id
                    })
                    console.log(this.state.selectedData.name);
                }).catch((error)=>{
                    
                });

            };
        };

    

    saveEdit = (id) =>{


        return () => {
            console.log(data);
            var data = {name: this.state.selectedName,
                        color: this.state.selectedColor,
                        gender: this.state.selectedGender,
                        movies: this.state.selectedMovies,
                        suggestion: this.state.selectedSuggestion};
            delete data.records;

            httpClient.patch('http://localhost:3004/surveys/'+id,
            data)
                .then((response)=> {
                    this.refreshData();
                }).catch((error)=> {

                });

            this.setState({
                show: false,
                selectedColor: "" ,
                selectedGender: "" ,
                selectedMovies: [] ,
                selectedName: "", 
                selectedSuggestion: ""
            });
        }
    };

  
    render() {

        var rows  = this.state.records.map((item,i)=>{

            return (
                <tr key={i}>
                     <td><Button  bsStyle="warning" onClick={this.deleteItem(item.id)}>Delete</Button></td>
                     <td><Button  bsStyle="warning" onClick={this.openModal(item.id)}>Edit</Button></td>
                     <td>{item.id}</td>
                     <td>{item.name}</td>
                     <td>{item.color}</td>
                     <td>{
                         item.movies.map((movie, mi)=> {
                             return <div key={mi}>
                                   <span className="label label-info">{movie}</span>
                                 </div>
                         })

                      }
                     </td>
                     <td>{item.gender}</td>
                     <td className="textfieldarea">{item.suggestion}</td>
                </tr>
            );
        });
        
        let close = () => this.setState({ show: false })



        return (
            <div className="container">
                <h1> {this.state.suway} </h1>
                <div className="page-header">
                <h2>Bohol Drag Race</h2>
                    <h2>Drag Bike Registration Form</h2>
                </div>
                <div className="jumbotron">
                    <Grid>
                        <Row>
                            <Col md={6}>
                                <Form>
                                    <FormGroup>
                                        <ControlLabel>Team Name</ControlLabel>
                                        <FormControl
                                            type="text"
                                            placeholder="Team Name here..."
                                            value={this.state.name}
                                            onChange={this.onChange('name')}
                                            />
                                        <HelpBlock></HelpBlock>
                                    </FormGroup>

                                    <FormGroup>
                                        <ControlLabel>Choose Bike Category</ControlLabel>
                                        <FormControl componentClass="select"
                                                     placeholder="Category here..."
                                                     value={this.state.color}
                                                     onChange={this.onChange('color')}
                                            >
                                            <option value="52mm 125cc">52mm 125cc</option>
                                            <option value="53mm 130cc">53mm 130cc</option>
                                            <option value="57mm 148cc">57mm 148cc</option>
                                            <option value="59mm 160cc">59mm 160cc</option>
                                            <option value="62mm Purestock Raider 150cc">62mm Purestock Raider 150cc</option>
                                            <option value="62mm Camgear Raider 150cc (Breedwars Rules)">62mm Camgear Raider 150cc (Breedwars Rules)</option>
                                            <option value="Open Category(Any higher cc)">Open Category(Any higher cc)</option>
                                        </FormControl>
                                        <HelpBlock></HelpBlock>
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>Transmission</ControlLabel>
                                        <Checkbox value="Automatic Transmission"
                                                  checked={this.state.movies.indexOf('Automatic Transmission')>=0 ? true:false}
                                                  onChange={this.checkboxChange('movies')}>
                                            Automatic Transmission
                                        </Checkbox>
                                        <Checkbox value="Automatic Transmission Clutching"
                                                  checked={this.state.movies.indexOf('Automatic Transmission Clutching')>=0 ? true:false}
                                                  onChange={this.checkboxChange('movies')}>
                                            Automatic Transmission Clutching
                                        </Checkbox>
                                        <Checkbox value="Manual Transmission Clutching"
                                                  checked={this.state.movies.indexOf('Manual Transmission Clutching')>=0 ? true:false}
                                                  onChange={this.checkboxChange('movies')}>
                                            Manual Transmission Clutching
                                        </Checkbox>
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>Track </ControlLabel>
                                        <Radio name="gender" value="250 Meters"
                                               onChange={this.onChange('gender')}>250 Meters</Radio>
                                        <Radio name="gender" value="400 Meters"
                                               onChange={this.onChange('gender')}>400 Meters</Radio>
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>Any comments or suggestions? Feel free to tell us</ControlLabel>
                                        <textarea
                                            type="textarea"
                                            placeholder="Tell us what you think..."
                                            value={this.state.suggestion}
                                            onChange={this.onChange('suggestion')}
                                            cols="59"
                                            rows="6"
                                            />
                                    </FormGroup>
                                    <ButtonGroup>

                                        <Button bsStyle="primary" onClick={this.saveSurvey}>Save Form</Button>

                                    </ButtonGroup><br/><br/>
                                </Form>
                            </Col>
                            <br/><Col md={10}>
                                <Table condensed striped bordered hover>
                                    <thead>
                                    <tr>
                                        <th>Delete</th>
                                        <th>Edit</th>
                                        <th>ID</th>
                                        <th>Team Name</th>
                                        <th>Category</th>
                                        <th>Transmission Type</th>
                                        <th>Track</th>
                                        <th>Suggestions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {rows}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Grid>

                </div>
                 <div className="modal-container" style={{height: 150}}>
                    <Modal
                    show={this.state.show}
                    onHide={close}
                    container={this}
                    aria-labelledby="contained-modal-title"
                    >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">Edit</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                                                <FormGroup>
                                                    <ControlLabel>Team Name</ControlLabel>
                                                    <FormControl
                                                        type="text"
                                                        placeholder="Team Name here..."
                                                        value={this.state.selectedName}
                                                        onChange={this.modalonChange('selectedName')}
                                                        />
                                                    <HelpBlock>use to identify you</HelpBlock>
                                                </FormGroup>
                                                <FormGroup>
                                                    <ControlLabel>Choose Category</ControlLabel>
                                                    <FormControl componentClass="select"
                                                                placeholder="Color here..."
                                                                value={this.state.selectedColor}
                                                                onChange={this.modalonChange('selectedColor')}
                                                        >
                                                        <option value="52mm 125cc">52mm 125cc</option>
                                            <option value="53mm 130cc">53mm 130cc</option>
                                            <option value="57mm 148cc">57mm 148cc</option>
                                            <option value="59mm 160cc">59mm 160cc</option>
                                            <option value="62mm Purestock Raider 150cc">62mm Purestock Raider 150cc</option>
                                            <option value="62mm Camgear Raider 150cc (Breedwars Rules)">62mm Camgear Raider 150cc (Breedwars Rules)</option>
                                            <option value="Open Category(Any higher cc)">Open Category(Any higher cc)</option>                                                  </FormControl>
                                                    <HelpBlock>use to identify you</HelpBlock>
                                                </FormGroup>
                                                <FormGroup>

                                                    <ControlLabel>Transmission</ControlLabel>
                                        <Checkbox value="Automatic Transmission"
                                                  checked={this.state.selectedMovies.indexOf('Automatic Transmission')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedMovies')}>
                                            Automatic Transmission
                                        </Checkbox>
                                        <Checkbox value="Automatic Transmission Clutching"
                                                  checked={this.state.selectedMovies.indexOf('Automatic Transmission Clutching')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedMovies')}>
                                            Automatic Transmission Clutching
                                        </Checkbox>
                                        <Checkbox value="Manual Transmission Clutching"
                                                  checked={this.state.selectedMovies.indexOf('Manual Transmission Clutching')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedMovies')}>
                                            Manual Transmission Clutching
                                        </Checkbox>
                                                </FormGroup>
                                                <FormGroup>
                                                    <ControlLabel>Track </ControlLabel>
                    <Radio name="selectedGender" value="250 Meters" checked={this.state.selectedGender=="250 Meters" ? true : false}
                                                        onChange={this.modalonChange('selectedGender')}>250 Meters</Radio>
                    <Radio name="selectedGender" value="400 Meters" checked={this.state.selectedGender=="400 Meters" ? true : false}
                                                        onChange={this.modalonChange('selectedGender')}>400 Meters</Radio>
                                                </FormGroup>
                                                 <FormGroup>
                                        <ControlLabel>Any comments or suggestions? Feel free to tell us</ControlLabel>
                                        <textarea
                                            type="textarea"
                                            placeholder="Tell us what you think..."
                                            value={this.state.selectedSuggestion}
                                            onChange={this.onChange('selectedSuggestion')}
                                            cols="59"
                                            rows="6"
                                            />
                                    </FormGroup>
                                                <ButtonGroup>

                                                    <Button bsStyle="primary" onClick={this.saveEdit(this.state.selectedId)}>Save Form</Button>

                                                </ButtonGroup>
                                            </Form>
                            </Modal.Body>
                        </Modal>
                        </div>
            </div>
        );
    }
}

export default App;