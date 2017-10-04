
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

const Application = ({ title, model }) => {
   const items = model.todos.map((todo, index) => {
      return (
            <li key={todo.id}>
            <input
               type="text"
               value={todo.text}
               onChange={e =>
                  model.updateTodo(index, {
                     id: todo.id,
                     text: e.target.value,
                     completed: todo.completed
                  })}
            />
            <label>Confirmed
                  <input type="checkbox"/>
            </label>
            <button onClick={() => model.removeTodo(todo)}> delete item</button>
         </li>
      )

   });
   return (
      <div className="wrapper">
            <header>
                  <h1>RSVP</h1>
                  <p> Registration App </p>
                  <form id="registrar"
                  onSubmit={e => {
                  e.preventDefault();
                  model.addTodo(model.inputValue);
                  }}
                  >
                        <input type="text" name="name" placeholder="Invite Someone"  onChange={e => (model.inputValue = e.target.value)}/>
                        <button type="submit" name="submit" value="submit">Submit</button>
                  </form>
            </header>
            <div className="main">	
                  <h2>Invitees</h2>
                  <ul id="invitedList">
                        {items}
                  </ul>	
            </div>
      </div>
      );
};
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