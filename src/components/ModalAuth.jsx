export default function ModalAuth({show, onSubmitIsAuthorised}) {
    const isNone = (show) ? '' : 'none'
    return (
        <>
            <div className={`Modal p-2vw ${isNone}`}>
                <div className="d-flex justify-content-center m-3">
                    <h2>Введите данные для входа</h2>
                </div>
                <form onSubmit={onSubmitIsAuthorised}>
                    <div className="mb-5">
                        <label htmlFor="idInstance" className="form-label ">idInstance</label>
                        <input name="idInstance" className="form-control auth_input" placeholder="0123456..." required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="apiTokenInstance" className="form-label">apiTokenInstance</label>
                        <input name="apiTokenInstance" className="form-control auth_input" placeholder="c91cca658sdf4be99185cf6fc0999a30d27ca23e2..." required />
                    </div>

                    <div className="d-flex justify-content-center m-3">
                        <button type="submit" className="btn btn-outline-secondary fs-4">Войти</button>
                    </div>
                </form>
            </div>
        </>

    )
}