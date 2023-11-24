
function BorderBottomDiv({className, children, ...props}) {
    return (
        <div className={className}
             style={{borderBottom: '1px solid #939393'}}
             {...props}
        >
            {children}
        </div>
    );
}

export default BorderBottomDiv;