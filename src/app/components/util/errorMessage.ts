import { FormGroup } from "@angular/forms";

export const getErrorMessage = (formGroup: FormGroup, controlName: string): string => {
    const control = formGroup.get(controlName);
    if (control?.touched) {
        if (control?.hasError('required')) {
            return 'Este campo es requerido.';
        }
    
        if (control?.hasError('minlength')) {
            return 'Debe tener al menos ' + control.getError('minlength').requiredLength + ' caracteres.';
        }
    
        if (control?.hasError('maxlength')) {
            return 'No puede tener más de ' + control.getError('maxlength').requiredLength + ' caracteres.';
        }

        if (control?.hasError('min')) {
            return 'El minimo permitido es ' + control.getError('min').min + '.';
        }
    
        if (control?.hasError('max')) {
            return 'El maximo permitido es ' + control.getError('max').max + '.';
        }

        if (control?.hasError('pattern')) {
            const pattern = control.getError('pattern').requiredPattern;

            let example;
            switch (pattern) {
                case '^(Hombre|Mujer)$':
                    example = 'Hombre o Mujer';
                    break;
                case '^[0-9]+$':
                    example = 'Solo numeros';
                    break;
                default:
                    example = 'Ejemplo de patrón válido';
                    break;
            }

            return `Debe seguir el patrón: ${example}.`;
        }
    }
  
    return '';
}
  