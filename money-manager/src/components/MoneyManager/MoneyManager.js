import { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import "./MoneyManager.css";
import TabItem from "../TabItem/TabItem.js";
import RegisterItem from "../RegisterItem/RegisterItem.js";

class MoneyManager extends Component {
  state = {
    title: "",
    amount: "",
    type: "expense",
    registerList: [],
  };

  tabIndexList = [
    {
      tabId: uuidv4(),
      heading: "Your Balance",
      iconUrl:
        "https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png",
      alt: "balance",
    },
    {
      tabId: uuidv4(),
      heading: "Your Income",
      iconUrl:
        "https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png",
      alt: "income",
    },
    {
      tabId: uuidv4(),
      heading: "Your Expenses",
      iconUrl:
        "https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png",
      alt: "income",
      bgColor: "#ffcece",
      bColor: "#ff5757",
    },
  ];

  updateTitle = (event) => this.setState({ title: event.target.value });

  updateAmount = (event) => this.setState({ amount: event.target.value });

  updateType = (event) => this.setState({ type: event.target.value });

  addTransaction = (event) => {
    event.preventDefault();
    const { title, amount, type } = this.state;
    if (title && amount && type) {
      this.setState((prevState) => {
        const newRegisterer = {
          id: uuidv4(),
          title: title,
          amount: amount,
          type: type,
        };

        // const currentAmount = Number(amount);

        if(type==="income"){
        return { registerList: [...prevState.registerList, newRegisterer],
        amount:"", title:"", type:"expense" };
        }
// , balance: (prevState.balance + currentAmount), income:(prevState.income + currentAmount)
        return { registerList: [...prevState.registerList, newRegisterer],
        amount:"", title:"", type:"expense" };
      // , balance: (prevState.balance - currentAmount), expense:(prevState.expense + currentAmount)
      });
    }
  };

  deleteItem = (id) => this.setState({registerList : this.state.registerList.filter( each => each.id!==id)})

  calculateBalance = () => {
    const {registerList} = this.state;
    // let balanceAmount = 0;
    let incomeAmount = 0;
    let expenseAmount = 0;

    registerList.forEach(eachItem => {
      // balanceAmount += Number(eachItem.amount);
      if(eachItem.type=== "expense"){
        expenseAmount+=Number(eachItem.amount);
      }
      else{
        incomeAmount += Number(eachItem.amount);
      }
    }
    )
      return [(incomeAmount-expenseAmount), incomeAmount, expenseAmount];
  }

  render() {
    const { registerList, title, amount, type } = this.state;
    const [ balance=0, income=0, expense=0 ] = this.calculateBalance();
    console.log(this.calculateBalance)
    
    return (
      <div className='money-manager'>
        <header className='header'>
          <h1>Hello, User</h1>
          <p>
            Welcome to your <span>Money Manager</span>{" "}
          </p>
        </header>

        <ul className='tab-index-list'>
          {/* {this.tabIndexList.map((eachTab) => ( */}
            <TabItem key={this.tabIndexList[0].tabId} tabDetails={this.tabIndexList[0]} money={balance} />
            <TabItem key={this.tabIndexList[1].tabId} tabDetails={this.tabIndexList[1]} money={income} />
            <TabItem key={this.tabIndexList[2].tabId} tabDetails={this.tabIndexList[2]} money={expense} />
          {/* ))} */}
        </ul>

        <main className='main'>
          <form className='form-container'>
            <h2>Add Transaction</h2>

            <div className='form-item'>
              <label htmlFor='title'>TITLE</label>
              <input
                type='text'
                id='title'
                placeholder='TITLE'
                onChange={this.updateTitle}
                autoComplete='off'
                value={title}
              ></input>
            </div>

            <div className='form-item'>
              <label htmlFor='amount'>AMOUNT</label>
              <input
                type='number'
                id='amount'
                placeholder='AMOUNT'
                onChange={this.updateAmount}
                autoComplete='off'
                value={amount}
              ></input>
            </div>

            <div className='form-item'>
              <label htmlFor='type'>TYPE</label>
              <select id='type' name='type' onChange={this.updateType} value={type}>
                <option name='type' value='expense' default>
                  Expense
                </option>
                <option name='type' value='income'>
                  Income
                </option>
              </select>
            </div>

            <button type='submit' onClick={this.addTransaction}>
              Add
            </button>
          </form>
          {/* {console.log(this.state)} */}
          <div className='transaction-register'>
            <h1>History</h1>
            <ul className='register-list'>
              <li className='register-list-item'>
                <h3>Title</h3> <h3>Amount</h3> <h3>Type</h3> <h3> </h3>
              </li>
              {registerList.map((eachRegister) => {
                return (
                  <RegisterItem
                    key={eachRegister.id}
                    transactionDetails={eachRegister}
                    deleteItem={this.deleteItem}
                  />
                );
              })}
            </ul>
          </div>
        </main>
      </div>
    );
  }
}

export default MoneyManager;
