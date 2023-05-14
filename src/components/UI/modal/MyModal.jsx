import React from 'react';
import style from './MyModal.module.css';

function MyModal(props) {

    /*Проверка должен ли быть класс активным (должно ли отображаться окно)*/
    const classes = [style.modal]
    if (props.visible){
        classes.push(style.active)
    }

    return (
        <div className={ classes.join(' ') } onClick={() => props.setVisible(false)}>
            <div className={ style.modalContent } onClick={event => event.stopPropagation()}>
                {props.children}
            </div>
        </div>
    );
}

export default MyModal;


