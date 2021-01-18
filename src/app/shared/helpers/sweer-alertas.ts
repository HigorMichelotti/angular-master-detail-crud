import Swal from 'sweetalert2';

export class EmitirAlerta {
    msg: any;


    public static alertaToastSuccess(msg: string, position?: any): any {
        const Toast = Swal.mixin({
            toast: true,
            position: position || 'top',
            customClass: {
                container: 'alertaToastNotificacaoTop',
                popup: 'popup-swall-custom-success',
                icon: 'icon-swall-custom-success',
                title: 'title-swall-white-success',
            },
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            },
        })

        Toast.fire({
            icon: 'success',
            title: msg,

        })
    }

    public static alertaToastError(msg: string, position?: any): any {
        const Toast = Swal.mixin({
            toast: true,
            position: position || 'top',
            customClass: {
                container: 'alertaToastNotificacaoTop',
                popup: 'popup-swall-custom-error',
                icon: 'icon-swall-custom-error',
                title: 'title-swall-white-error',
            },
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'error',
            iconHtml: '<img src="./assets/images/sad.png" style="width: 32px !important"  />',
            title: msg,
        })
    }

    public static alertaToastNotificacao(msg: string, position?: any): any {
        const Toast = Swal.mixin({
            toast: true,
            position: position || 'top-right',
            showConfirmButton: false,
            timer: 3000,
            // customClass: 'alertaToastNotificacaoTop',
        })

        Toast.fire({
            icon: 'success',
            title: msg
        })

    }
}