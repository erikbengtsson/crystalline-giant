import React, { Component } from 'react'

class Counters extends Component {
  state = {
    allKeywords: ['Flying', 'First Strike', 'Deathtouch', 'Hexproof', 'Lifelink', 'Menace', 'Reach', 'Trample', 'Vigilance', '+1/+1'],
    unusedKeywords: ['Flying', 'First Strike', 'Deathtouch', 'Hexproof', 'Lifelink', 'Menace', 'Reach', 'Trample', 'Vigilance', '+1/+1'],
    activeKeywords: [],
    rolling: false
  }

  onRoll = () => {
    const unusedLength = this.state.unusedKeywords.length
    if(unusedLength){
      let dice = Math.floor(Math.random() * unusedLength)

      let used = [...this.state.activeKeywords]
      let unused = [...this.state.unusedKeywords]
      used.push(unused[dice])
      unused.splice(dice, 1)
      this.setState({
        activeKeywords: used,
        unusedKeywords: unused
      })
    }
  }

  onReset = () => {
    const unusedKeywords = [...this.state.allKeywords]
    const activeKeywords = []

    this.setState({
      activeKeywords,
      unusedKeywords
    })
  }

  toggleCounter = (keyword) => {

    let unusedKeywords = [...this.state.unusedKeywords]
    let activeKeywords = [...this.state.activeKeywords]
    if(unusedKeywords.includes(keyword)){
      unusedKeywords = unusedKeywords.filter(v => { return v !== keyword })
      activeKeywords.push(keyword)
    }else{
      unusedKeywords.push(keyword)
      activeKeywords = activeKeywords.filter(v => {return v !== keyword })
    }
    this.setState({
      unusedKeywords,
      activeKeywords
    })
  }

  render(){
    let counterElements = this.state.allKeywords.map((keyword, index) => {
      let c = "counter"

      if(this.state.activeKeywords.includes(keyword)){
        c = "counter selected"
      }
      return <div key={keyword} onClick={(e) => this.toggleCounter(keyword)} className={c}>{keyword}</div>
    })
    return(
      <>
        <div className="counters">
        {counterElements}
        </div>
        <footer className="app-footer">
          <button type="button" onClick={this.onRoll}>Roll</button>
          <button type="button" onClick={this.onReset}>Reset</button>
        </footer>
      </>
    )
  }
}

export default Counters
