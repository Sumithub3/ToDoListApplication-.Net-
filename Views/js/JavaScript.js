const MainForm = () => {

    const { useState } = React;
    const [formdata, setformdata] = useState({
        f_name: "",
        l_name: "",
        s_email: "",
        city: "",
        country: "",
        pin: "",
        e_name: "",
        e_address: ""
    });

    const inputEvent = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setformdata((lastValue) => {
            return {
                ...lastValue,
                [name]: value
            }
        });
    }

    const SubmitDetails = (e) => {
        e.preventDefault();
    }


    const [step, setStep] = useState(0);

    const FormNumber = () => {
        if (step == 0) {
            return (<Step_1 />);
        }
        else if (step == 1) {
            return (<Step_2 />);
        }
        else if (step == 2) {
            return (<Step_3 />);
        }
    }

    const Step_1 = () => {
        return (
            <>
                <form onSubmit={SubmitDetails}>
                    <h2>Step 1</h2>
                    <div className="input_text">
                        <span>First Name</span>
                        <input type="text" name="f_name" value={formdata.f_name} onChange={inputEvent} />
                    </div>
                    <div className="input_text">
                        <span>Last Name</span>
                        <input type="text" name="l_name" value={formdata.l_name} onChange={inputEvent} />
                    </div>
                    <div className="input_text">
                        <span>Student E-mail</span>
                        <input type="text" name="s_email" value={formdata.s_email} onChange={inputEvent} />
                    </div>
                    <div className="btn">
                        <button type="submit" onClick={() => { setStep(step + 1) }}>Next</button>
                    </div>
                </form>
            </>
        );
    }
    const Step_2 = () => {
        return (
            <>
                <h2>Step 2</h2>
                <div className="input_text">
                    <span>City</span>
                    <input type="text" name="city" value={formdata.city} onChange={inputEvent} />
                </div>
                <div className="input_text">
                    <span>Country</span>
                    <input type="text" name="country" value={formdata.country} onChange={inputEvent} />
                </div>
                <div className="input_text">
                    <span>Pin Code</span>
                    <input type="number" name="pin" value={formdata.pin} onChange={inputEvent} />
                </div>
                <div className="btn btns">
                    <button onClick={() => { setStep(step - 1) }}>Previous</button>
                    <button onClick={() => { setStep(step + 1) }}>Next</button>
                </div>
            </>
        );
    }
    const Step_3 = () => {
        return (
            <>
                <h2>Step 3</h2>
                <div className="input_text">
                    <span>Employee Name</span>
                    <input type="text" name="e_name" value={formdata.e_name} onChange={inputEvent} />
                </div>
                <div className="input_text">
                    <span>Employee Address</span>
                    <input type="text" name="e_address" value={formdata.e_address} onChange={inputEvent} />
                </div>
                <div className="input_text">
                    <span>Employee E-mail</span>
                    <input type="text" name="e_email" value={formdata.e_email} onChange={inputEvent} />
                </div>
                <div className="btn btns">
                    <button onClick={() => { setStep(step - 1) }}>Previous</button>
                    <button onClick={() => { setStep(step + 1) }}>Next</button>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="container">
                <div className="card">
                    <div>{<FormNumber />}</div>
                </div>
            </div>
        </>
    );
}
ReactDOM.render(
    <MainForm />, document.getElementById("root"));