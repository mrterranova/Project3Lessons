// import React, {Component} from "react"
// import ReactDOM from "react-dom"
// import DnR from '../../components/DnR'

// const paneStyle = {
// 	width: '80%',
// 	height: '50%',
// 	top: '25%',
// 	left: '10%',
// 	backgroundColor: 'rgba(0, 0, 0, 0.2)'
// }

// const buttonStyle = {
// 		paddingLeft: 10,
// 		textAlign: 'center'
// }

// class UserLesson extends Component{
//   constructor(props) {
//     super(props);
//     this.state = {
//       minimize: false
//     }
// 	}
// 	render() {
// 		return (
// 			<div style={{
// 				background:'#3a7bd5',
// 				top: 0,
// 				left : 0,
// 				width: '100%',
// 				height: '100%',
//         position: 'fixed',
// 			}}>
// 				<div style={{
// 					display: 'flex',
// 					alignItems: 'center',
// 					verticalAlign: 'baseline',
// 					padding: 10,
// 				}}>
// 					<button
// 						style={buttonStyle}
// 						onClick={()=>this.refs.dnr.minimize()}>
// 						minimize
// 					</button>
// 					<button
// 						style={buttonStyle}
// 						onClick={()=>this.refs.dnr.maximize()}>
// 						maximize
// 					</button>
// 					<button
// 						style={buttonStyle}
// 						onClick={()=>this.refs.dnr.restore()}>
// 						restore
// 					</button>
// 				</div>
// 				<DnR
// 					ref='dnr'
// 					{...this.Windows}
// 					cursorRemap={(c) => c === 'move' ? 'default' : null}
// 					style={paneStyle}>
// 					<button
// 						onClick={()=>this.refs.subdnr.minimize()}>
// 						minimize
// 					</button>
// 					<button
// 						onClick={()=>this.refs.subdnr.transform({
// 							top: 0,
// 							left: 0,
// 							width: this.refs.dnr.getFrameRect().width,
// 							height: this.refs.dnr.getFrameRect().height})}>
// 						maximize
// 					</button>
// 					<button
// 						onClick={()=>this.refs.subdnr.restore()}>
// 						restore
// 					</button>
// 					<DnR
// 						ref='subdnr'
// 						{...this.OSX}
// 						cursorRemap={(c) => c === 'move' ? 'default' : null}
// 						style={paneStyle}
// 						boundary={{top: 0}}>
// 						content
// 					</DnR>
// 				</DnR>
// 			</div>
// 		)
// 	}
// }

// export default UserLesson