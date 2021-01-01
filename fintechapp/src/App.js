// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import React, { Component } from 'react';
import jQuery from 'jquery';
class RequestPay extends React.Component {
//   constructor(){
//     this.IMP =  window.IMP;
//   }
  requestPay = () => {
    const { IMP } = window;
    IMP.init("imp35974880");
    // IMP.request_pay(param, callback) 호출
    IMP.request_pay({ // param
      pg: "html5_inicis",
      pay_method: "card",
      merchant_uid: "ORD20180131-0000021",
      name: "노르웨이 회전 의자2",
      amount: 50,
      buyer_email: "gildong2@gmail.com",
      buyer_name: "홍길동",
      buyer_tel: "010-4242-4242",
      buyer_addr: "서울특별시 강남구 신사동",
      buyer_postcode: "01182",
      m_redirect_url: "http://localhost:5000/payments/complete/mobile"
    }, rsp => { // callback
      if (rsp.success) {
        jQuery.ajax({
          url: "http://localhost:5000/payments/complete", // 가맹점 서버
          method: "POST",
          headers: { "Content-Type": "application/json" },
          data: {
              imp_uid: rsp.imp_uid,
              merchant_uid: rsp.merchant_uid
          }
        }).done(function (data) {
        // 가맹점 서버 결제 API 성공시 로직
        switch(data.status) {
          case "vbankIssued":
            // 가상계좌 발급 시 로직
            break;
          case "success":
            // 결제 성공 시 로직
            break;
        }
      })
      } else {
        alert("결제에 실패하였습니다. 에러 내용: " +  rsp.error_msg);
      }
    });
  }
  render() {
    return (
      <div>
      <button onClick={this.requestPay}>결제하기</button>
      </div>
    );
  }
}

export default RequestPay;