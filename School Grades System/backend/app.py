from grade_service import build_student_report, show_report, validate_grade


def ask_grade(subject):
    while True:
        value = input(f"Digite a nota de {subject}: ")
        grade = validate_grade(value)

        if grade is not None:
            return grade

        print("Nota invalida. Digite um numero de 0 a 10.")


def main():
    subjects = ["Matematica", "Portugues", "Historia", "Ciencias"]
    grades = []

    print("=== SCHOOL GRADES SYSTEM ===")
    student_name = input("Nome do aluno: ")

    if student_name == "":
        student_name = "Aluno sem nome"

    for subject in subjects:
        grade = ask_grade(subject)
        grades.append(grade)

    report = build_student_report(student_name, grades)
    show_report(report)


if __name__ == "__main__":
    main()
