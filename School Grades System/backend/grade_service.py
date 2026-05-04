PASSING_AVERAGE = 7


def calculate_average(grades):
    total = 0

    for grade in grades:
        total = total + grade

    return total / len(grades)


def get_status(average):
    if average >= PASSING_AVERAGE:
        return "Aprovado"

    return "Reprovado"


def validate_grade(value):
    try:
        grade = float(value)

        if grade < 0 or grade > 10:
            return None

        return grade
    except ValueError:
        return None


def build_student_report(name, grades):
    average = calculate_average(grades)
    status = get_status(average)

    report = {
        "name": name,
        "grades": grades,
        "average": average,
        "status": status,
    }

    return report


def show_report(report):
    print("\n=== BOLETIM ===")
    print(f"Aluno: {report['name']}")
    print(f"Notas: {report['grades']}")
    print(f"Media: {report['average']:.1f}")
    print(f"Status: {report['status']}")
