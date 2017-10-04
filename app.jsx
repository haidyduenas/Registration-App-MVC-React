
class Model {

   constructor () {
      this.todos = [];
      this.inputValue = null;
      this.render = undefined;
   }
  
   subscribe(render) {
      this.render = render;
   }
   inform() {
      console.log(this.todos.map(e => e.text));
      this.render();
   }
   addTodo(text) {
      this.todos.push({
         id: Utils.uuid(),
         text: text,
         completed: false
      });
      this.inform();
   }
   updateTodo(index, todo) {
      this.todos[index] = todo;
      this.inform();
   }
   removeTodo(todo) {
      this.todos = this.todos.filter(item => item !== todo);
      this.inform();
   }
}
const Header = () => {
      return (
      <div className="wrapper">
            <header>
                  <h1>RSVP</h1>
                  <p> Registration App </p>
                  <form id="registrar">
                        <input type="text" name="name" placeholder="Invite Someone"/>
                        <button type="submit" name="submit" value="submit">Submit</button>
                  </form>
            </header>
            <div className="main">	
                  <h2>Invitees</h2>
                  <ul id="invitedList"></ul>	
            </div>
      </div>
      );
    }

const Application = () => {
      return (
        <div className='scoreboard'>
          <Header/>   
        </div>
      );
    }
let model = new Model();
let counter = 1;

let render = () => {
   console.log('render times: ', counter++);
   ReactDOM.render(
      <Application title="ScoreBoard" model={model} />,
      document.getElementById('container')
   );
};
model.subscribe(render); 

render(); 