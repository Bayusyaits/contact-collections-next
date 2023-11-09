import React from "react";
// import { AlertState } from "store/snackbar";
// export interface Props {
//   onClose: (val: string) => void;
//   autohide?: boolean;
//   actionBtn?: {
//     name: string;
//     className: string;
//     callbackFunction: () => void;
//   } | null;
//   alerts?: AlertState[];
// }
// const SnackbarView: React.FC<Props> = (props) => {
//   const alerts = props.alerts;
//   const renderActionButton = (el: string) => {
//     return (
//       <button
//         onClick={() => props.onClose(el)}
//         className="btn-transparent ms-auto"
//         type="button"
//         data-bs-dismiss="toast"
//         aria-label="Close"
//       >
//         Close
//       </button>
//     );
//   };
//   const setClassAlert = (code: number) => {
//     let c = "alert-info";
//     if (code <= 100) {
//       c = "alert-primary";
//     } else if (code > 100 && code < 300) {
//       c = "alert-success";
//     } else {
//       c = "alert-danger";
//     }
//     return c;
//   };
//   const alert = (el: any) => {
//     return (
//       <div
//         key={`snackbar-${el.id}`}
//         id={`snackbar-${el.id}`}
//         className={`snackbar shadow bg-white d-block mb-2 ${setClassAlert(
//           el.code
//         )}`}
//         role="alert"
//         aria-live="assertive"
//         aria-atomic="true"
//         data-bs-delay="5000"
//         data-bs-autohide="true"
//       >
//         <div className="toast-body">
//           <div className="content d-flex align-items-center mb-2">
//             {el.image && <img src={el.image} alt="" />}
//             {el.name ? (
//               <h6 className="mb-0 mr-05">{el.name}</h6>
//             ) : (
//               <h6 className="mb-0 mr-05">Notification</h6>
//             )}
//             {renderActionButton(el.id)}
//           </div>
//           <p className="mb-0 d-block">{el.message}</p>
//         </div>
//       </div>
//     );
//   };
//   return (
//     <div className="pwa-install-alert mw-50">
//       {alerts && alerts.map((el: AlertState) => alert(el))}
//     </div>
//   );
// };
const SnackbarView = () => {
  return (<></>)
}
export default SnackbarView;
