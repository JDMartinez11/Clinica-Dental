import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface DentalService {
  id: string;
  name: string;
  icon: string;          // clase de Font Awesome
  shortDescription: string;
  longDescription: string;
  label: string;         // "Beneficios" / "Ventajas"
  bullets: string[];     // lista que se ve en la card
  extraPoints: string[]; // lista ampliada que se ve en el modal
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.html',
  styleUrls: ['./services.scss'],
})
export class ServicesComponent {
  services: DentalService[] = [
    {
      id: 'implantes',
      name: 'Implantes Dentales',
      icon: 'fas fa-tooth',
      shortDescription:
        'Reemplazan dientes perdidos con una solución fija, duradera y de aspecto muy natural.',
      longDescription:
        'Los implantes dentales funcionan como “raíces artificiales” que se integran con el hueso y sirven de base para coronas o prótesis. ' +
        'Ayudan a recuperar la capacidad de masticar, mejorar la estética y preservar el hueso y la estabilidad de los dientes vecinos.',
      label: 'Beneficios',
      bullets: [
        'Alta durabilidad y estabilidad al masticar.',
        'Aspecto muy similar a un diente natural.',
        'Ayudan a preservar el hueso de la mandíbula.',
        'No dañan ni desgastan dientes vecinos.',
        'Mejoran la confianza al hablar y sonreír.',
      ],
      extraPoints: [
        'Restablecen la función masticatoria de forma muy parecida a un diente natural, permitiendo comer con más comodidad.',
        'Ayudan a evitar que el hueso se reabsorba tras la pérdida del diente, lo que mantiene mejor el contorno facial.',
        'Son una alternativa fija a los puentes o dentaduras removibles, reduciendo movilidad o incomodidad de las prótesis tradicionales.',
        'Con buenos cuidados y revisiones periódicas pueden acompañarte durante muchos años.',
      ],
    },
    {
      id: 'ortodoncia',
      name: 'Ortodoncia',
      icon: 'fas fa-teeth-open', // icono para “aparatos / dientes”
      shortDescription:
        'Alinea los dientes y corrige la mordida para mejorar estética, función y salud bucal.',
      longDescription:
        'La ortodoncia corrige dientes desalineados y problemas de mordida (sobremordida, mordida abierta, cruzada, etc.). ' +
        'Una buena alineación facilita la higiene, mejora la función al masticar y hablar y reduce el riesgo de caries y enfermedad de encías a largo plazo.',
      label: 'Ventajas',
      bullets: [
        'Mejora la estética de la sonrisa.',
        'Corrige problemas de mordida.',
        'Facilita la limpieza entre dientes.',
        'Puede reducir desgaste y fracturas.',
        'Opciones con brackets o alineadores.',
      ],
      extraPoints: [
        'Al tener los dientes mejor alineados es más fácil cepillarlos y usar hilo dental, lo que reduce placa y riesgo de caries y gingivitis.',
        'Puede mejorar el reparto de las fuerzas al masticar y disminuir dolor o sobrecarga en ciertas piezas o articulaciones.',
        'Un tratamiento bien planificado ayuda a prevenir problemas futuros como movilidad o desgastes irregulares.',
        'Existen opciones discretas (brackets estéticos y alineadores transparentes) ideales para adultos que buscan algo menos visible.',
      ],
    },
    {
      id: 'blanqueamiento',
      name: 'Blanqueamiento Dental',
      icon: 'fas fa-teeth',
      shortDescription:
        'Aclara varios tonos el color de los dientes bajo supervisión profesional.',
      longDescription:
        'El blanqueamiento dental profesional utiliza geles específicos aplicados por el dentista o bajo su supervisión. ' +
        'Es un procedimiento seguro y efectivo cuando se realiza con los materiales adecuados y tras una valoración previa del estado de dientes y encías.',
      label: 'Beneficios',
      bullets: [
        'Aclara el tono de los dientes de forma visible.',
        'Procedimiento rápido en consultorio.',
        'Resultados que pueden mantenerse con buen cuidado.',
        'Mejora la confianza al sonreír.',
        'Protocolos adaptados según la sensibilidad del paciente.',
      ],
      extraPoints: [
        'Se recomienda realizar una limpieza profesional previa para mejorar el resultado del blanqueamiento.',
        'Solo actúa sobre dientes naturales; empastes y coronas no cambian de color, por lo que se planifica el tratamiento de forma personalizada.',
        'Puede hacerse en clínica o combinado con férulas para casa según las necesidades del paciente.',
        'La sensibilidad, si aparece, suele ser temporal y se maneja con productos desensibilizantes específicos.',
      ],
    },
    {
      id: 'higiene',
      name: 'Higiene Dental Profesional',
      icon: 'fas fa-toothbrush',
      shortDescription:
        'Limpieza profunda para eliminar placa, sarro y prevenir enfermedad de encías.',
      longDescription:
        'La higiene dental profesional incluye la eliminación de placa, sarro y manchas con instrumentos específicos. ' +
        'Es fundamental para prevenir gingivitis y periodontitis, y se recomienda realizarla de forma periódica según el riesgo de cada paciente.',
      label: 'Ventajas',
      bullets: [
        'Elimina sarro que el cepillo no puede retirar.',
        'Ayuda a prevenir gingivitis y periodontitis.',
        'Mejora el aliento y la sensación de limpieza.',
        'Permite detectar problemas en etapas tempranas.',
      ],
      extraPoints: [
        'Al retirar placa y cálculo por encima y por debajo de la encía, disminuye la inflamación y el sangrado.',
        'Se complementa con instrucciones de higiene personalizadas (técnica de cepillado, hilo dental, cepillos interproximales).',
        'Es un refuerzo clave tras tratamientos como ortodoncia o implantes para mantener la salud alrededor de las piezas.',
        'La frecuencia puede oscilar entre 1 y 3 veces al año según el caso y el historial del paciente.',
      ],
    },
    {
      id: 'cirugia',
      name: 'Cirugía Oral',
      icon: 'fas fa-user-md',
      shortDescription:
        'Incluye extracciones complejas, muelas del juicio y otros procedimientos quirúrgicos de la boca.',
      longDescription:
        'La cirugía oral trata problemas como muelas del juicio retenidas, dientes fracturados o infecciones que no se pueden resolver con otros tratamientos. ' +
        'La planificación con estudios de imagen y las técnicas actuales permiten procedimientos más predecibles y una recuperación más cómoda.',
      label: 'Beneficios',
      bullets: [
        'Resuelve infecciones y dolor de piezas problemáticas.',
        'Previene daños a dientes y encías adyacentes.',
        'Mejora el acceso para la higiene en la zona.',
      ],
      extraPoints: [
        'En muelas del juicio puede prevenir apiñamiento, infecciones recurrentes o daño al diente adyacente.',
        'Tras la cirugía se dan indicaciones claras sobre medicación, higiene y dieta para favorecer la cicatrización.',
        'En muchos casos las molestias principales mejoran en pocos días, aunque la cicatrización completa lleva más tiempo.',
        'Una buena valoración previa ayuda a elegir el mejor momento y el tipo de procedimiento para cada paciente.',
      ],
    },
  ];

  selectedService: DentalService | null = null;

  beforeAfterValue = 50;

  showDetails(service: DentalService) {
    this.selectedService = service;
  }

  closeDetails() {
    this.selectedService = null;
  }
}
